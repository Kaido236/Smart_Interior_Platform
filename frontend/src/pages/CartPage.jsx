import { useEffect, useState } from "react";
import Button from "../components/common/Button.jsx";
import { checkout } from "../services/orderService.js";
import { clearCart, getCart, removeCartItem, updateCartItem } from "../services/cartService.js";

const emptyCheckoutForm = {
  receiverName: "",
  receiverPhone: "",
  shippingAddress: "",
  note: "",
};

const fallbackImage =
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80";

function formatPrice(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function CartPage() {
  const [cart, setCart] = useState({ items: [], totalAmount: 0 });
  const [checkoutForm, setCheckoutForm] = useState(emptyCheckoutForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadCart();
  }, []);

  async function loadCart() {
    setLoading(true);
    setError("");

    try {
      setCart(await getCart());
    } catch (requestError) {
      setError(requestError.message || "Could not load cart.");
    } finally {
      setLoading(false);
    }
  }

  async function runCartAction(action, successMessage) {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const nextCart = await action();
      setCart(nextCart);
      if (successMessage) {
        setSuccess(successMessage);
      }
    } catch (requestError) {
      setError(requestError.message || "Cart action failed.");
    } finally {
      setSaving(false);
    }
  }

  function updateCheckoutField(name, value) {
    setCheckoutForm((current) => ({ ...current, [name]: value }));
  }

  async function handleCheckout(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      await checkout(checkoutForm);
      setCart(await getCart());
      setCheckoutForm(emptyCheckoutForm);
      setSuccess("Checkout completed successfully.");
    } catch (requestError) {
      setError(requestError.message || "Checkout failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="page-section shop-management-page">
      <div className="shop-page-top">
        <div className="products-page-header fade-in">
          <p className="eyebrow">Shopping Cart</p>
          <h1>Your cart</h1>
          <p className="section-description">Review quantities and checkout from the current cart.</p>
        </div>
        <Button to="/products" variant="secondary">Continue Shopping</Button>
      </div>

      {error && <p className="error-text shop-feedback">{error}</p>}
      {success && <p className="success-text shop-feedback">{success}</p>}

      {loading ? (
        <div className="shop-loading">Loading cart...</div>
      ) : (
        <div className="cart-layout">
          <div className="shop-list">
            {cart.items.map((item) => (
              <article className="shop-list-item" key={item.cartItemId}>
                <img src={item.imageUrl || fallbackImage} alt={item.productName} />
                <div>
                  <h3>{item.productName}</h3>
                  <p>{formatPrice(item.unitPrice)} - Stock {item.stockQuantity}</p>
                  <p>Subtotal: {formatPrice(item.subtotal)}</p>
                </div>
                <div className="shop-list-actions">
                  <input
                    className="cart-quantity-input"
                    type="number"
                    min="1"
                    max={item.stockQuantity}
                    value={item.quantity}
                    disabled={saving}
                    onChange={(event) =>
                      runCartAction(
                        () => updateCartItem(item.cartItemId, Number(event.target.value)),
                        "Cart updated."
                      )
                    }
                  />
                  <button
                    className="filter-pill"
                    type="button"
                    disabled={saving}
                    onClick={() => runCartAction(() => removeCartItem(item.cartItemId), "Item removed.")}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}

            {!cart.items.length && <p className="shop-loading">Your cart is empty.</p>}

            {!!cart.items.length && (
              <div className="cart-summary">
                <strong>Total: {formatPrice(cart.totalAmount)}</strong>
                <button
                  className="filter-pill"
                  type="button"
                  disabled={saving}
                  onClick={() => runCartAction(clearCart, "Cart cleared.")}
                >
                  Clear cart
                </button>
              </div>
            )}
          </div>

          <form className="shop-form checkout-form" onSubmit={handleCheckout}>
            <h2>Shipping information</h2>
            <label>
              Receiver name
              <input
                value={checkoutForm.receiverName}
                onChange={(event) => updateCheckoutField("receiverName", event.target.value)}
                required
              />
            </label>
            <label>
              Receiver phone
              <input
                value={checkoutForm.receiverPhone}
                onChange={(event) => updateCheckoutField("receiverPhone", event.target.value)}
                required
              />
            </label>
            <label>
              Shipping address
              <textarea
                rows="4"
                value={checkoutForm.shippingAddress}
                onChange={(event) => updateCheckoutField("shippingAddress", event.target.value)}
                required
              />
            </label>
            <label>
              Note
              <textarea
                rows="3"
                value={checkoutForm.note}
                onChange={(event) => updateCheckoutField("note", event.target.value)}
              />
            </label>
            <Button type="submit" disabled={saving || !cart.items.length}>
              {saving ? "Checking out..." : "Checkout"}
            </Button>
          </form>
        </div>
      )}
    </section>
  );
}

export default CartPage;
