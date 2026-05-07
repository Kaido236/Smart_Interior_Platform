import { useEffect, useState } from "react";
import Button from "../components/common/Button.jsx";
import { cancelOrder, getMyOrders } from "../services/orderService.js";

function formatPrice(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    setLoading(true);
    setError("");

    try {
      setOrders(await getMyOrders());
    } catch (requestError) {
      setError(requestError.message || "Could not load orders.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCancel(orderId) {
    setSavingId(orderId);
    setError("");
    setSuccess("");

    try {
      await cancelOrder(orderId);
      setSuccess("Order cancelled successfully.");
      await loadOrders();
    } catch (requestError) {
      setError(requestError.message || "Could not cancel order.");
    } finally {
      setSavingId(null);
    }
  }

  return (
    <section className="page-section shop-management-page">
      <div className="shop-page-top">
        <div className="products-page-header fade-in">
          <p className="eyebrow">Order History</p>
          <h1>My orders</h1>
          <p className="section-description">Track purchases and cancel pending orders.</p>
        </div>
        <Button to="/products" variant="secondary">Shop</Button>
      </div>

      {error && <p className="error-text shop-feedback">{error}</p>}
      {success && <p className="success-text shop-feedback">{success}</p>}

      {loading ? (
        <div className="shop-loading">Loading orders...</div>
      ) : (
        <div className="shop-list">
          {orders.map((order) => (
            <article className="order-card" key={order.id}>
              <div className="order-card-header">
                <div>
                  <h3>{order.orderCode}</h3>
                  <p>{order.receiverName} - {order.receiverPhone}</p>
                  <p>{order.shippingAddress}</p>
                </div>
                <div>
                  <span className="category-badge">{order.status}</span>
                  <strong>{formatPrice(order.totalAmount)}</strong>
                </div>
              </div>

              <div className="order-items">
                {order.items.map((item) => (
                  <div className="order-item-row" key={item.id}>
                    <span>{item.productName}</span>
                    <span>{item.quantity} x {formatPrice(item.unitPrice)}</span>
                    <span>{formatPrice(item.subtotal)}</span>
                  </div>
                ))}
              </div>

              {order.status === "PENDING" && (
                <button
                  className="filter-pill"
                  type="button"
                  disabled={savingId === order.id}
                  onClick={() => handleCancel(order.id)}
                >
                  {savingId === order.id ? "Cancelling..." : "Cancel order"}
                </button>
              )}
            </article>
          ))}

          {!orders.length && <p className="shop-loading">You have no orders yet.</p>}
        </div>
      )}
    </section>
  );
}

export default OrdersPage;
