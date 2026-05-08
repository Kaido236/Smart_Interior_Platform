package com.smartinterior.platform.order;

import com.smartinterior.platform.cart.Cart;
import com.smartinterior.platform.cart.CartItem;
import com.smartinterior.platform.cart.CartItemRepository;
import com.smartinterior.platform.cart.CartRepository;
import com.smartinterior.platform.common.ApiException;
import com.smartinterior.platform.order.dto.CheckoutRequest;
import com.smartinterior.platform.order.dto.OrderResponse;
import com.smartinterior.platform.product.Product;
import com.smartinterior.platform.product.ProductRepository;
import com.smartinterior.platform.product.ProductStatus;
import com.smartinterior.platform.user.User;
import com.smartinterior.platform.user.UserRepository;
import com.smartinterior.platform.user.UserRole;
import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.ThreadLocalRandom;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService {

    private static final DateTimeFormatter ORDER_CODE_TIME = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public OrderService(
            OrderRepository orderRepository,
            OrderItemRepository orderItemRepository,
            CartRepository cartRepository,
            CartItemRepository cartItemRepository,
            ProductRepository productRepository,
            UserRepository userRepository
    ) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public OrderResponse checkout(CheckoutRequest request, String currentUserEmail) {
        User buyer = getCurrentUser(currentUserEmail);
        Cart cart = cartRepository.findByUserId(buyer.getId())
                .orElseThrow(() -> ApiException.badRequest("Cart is empty"));
        List<CartItem> cartItems = cartItemRepository.findByCartIdOrderByCreatedAtAsc(cart.getId());
        if (cartItems.isEmpty()) {
            throw ApiException.badRequest("Cart is empty");
        }

        List<Product> lockedProducts = new ArrayList<>();
        BigDecimal totalAmount = BigDecimal.ZERO;
        for (CartItem cartItem : cartItems) {
            Product product = productRepository.findByIdForUpdate(cartItem.getProduct().getId())
                    .orElseThrow(() -> ApiException.notFound("Product not found"));
            validateProductForCheckout(product, buyer, cartItem.getQuantity());
            lockedProducts.add(product);
            totalAmount = totalAmount.add(product.getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())));
        }

        Order order = new Order();
        order.setBuyer(buyer);
        order.setOrderCode(generateOrderCode());
        order.setTotalAmount(totalAmount);
        order.setFinalAmount(totalAmount);
        order.setStatus(OrderStatus.PENDING);
        order.setReceiverName(request.receiverName().trim());
        order.setReceiverPhone(request.receiverPhone().trim());
        order.setShippingAddress(request.shippingAddress().trim());
        order.setNote(normalizeNullable(request.note()));
        Order savedOrder = orderRepository.save(order);

        List<OrderItem> orderItems = new ArrayList<>();
        for (int i = 0; i < cartItems.size(); i++) {
            CartItem cartItem = cartItems.get(i);
            Product product = lockedProducts.get(i);
            BigDecimal unitPrice = product.getPrice();
            BigDecimal subtotal = unitPrice.multiply(BigDecimal.valueOf(cartItem.getQuantity()));

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(savedOrder);
            orderItem.setProduct(product);
            orderItem.setSeller(product.getSeller());
            orderItem.setProductName(product.getName());
            orderItem.setProductImage(product.getImageUrl());
            orderItem.setUnitPrice(unitPrice);
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setSubtotal(subtotal);
            orderItems.add(orderItem);

            int nextStock = product.getStockQuantity() - cartItem.getQuantity();
            product.setStockQuantity(nextStock);
            if (nextStock == 0) {
                product.setStatus(ProductStatus.OUT_OF_STOCK);
            }
        }

        List<OrderItem> savedItems = orderItemRepository.saveAll(orderItems);
        cartItemRepository.deleteByCartId(cart.getId());
        return OrderResponse.from(savedOrder, savedItems);
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> getMyOrders(String currentUserEmail) {
        User buyer = getCurrentUser(currentUserEmail);
        return orderRepository.findByBuyerIdOrderByCreatedAtDesc(buyer.getId())
                .stream()
                .map(order -> OrderResponse.from(order, orderItemRepository.findByOrderIdOrderByIdAsc(order.getId())))
                .toList();
    }

    @Transactional(readOnly = true)
    public OrderResponse getOrder(Long id, String currentUserEmail) {
        User currentUser = getCurrentUser(currentUserEmail);
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> ApiException.notFound("Order not found"));
        requireOrderAccess(order, currentUser);
        return OrderResponse.from(order, orderItemRepository.findByOrderIdOrderByIdAsc(order.getId()));
    }

    @Transactional
    public OrderResponse cancelOrder(Long id, String currentUserEmail) {
        User currentUser = getCurrentUser(currentUserEmail);
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> ApiException.notFound("Order not found"));
        requireOrderAccess(order, currentUser);
        if (order.getStatus() != OrderStatus.PENDING) {
            throw ApiException.badRequest("Only pending orders can be cancelled");
        }

        List<OrderItem> orderItems = orderItemRepository.findByOrderIdOrderByIdAsc(order.getId());
        for (OrderItem item : orderItems) {
            if (item.getProduct() == null) {
                continue;
            }
            Product product = productRepository.findByIdForUpdate(item.getProduct().getId())
                    .orElse(null);
            if (product == null) {
                continue;
            }
            product.setStockQuantity(product.getStockQuantity() + item.getQuantity());
            if (product.getStatus() == ProductStatus.OUT_OF_STOCK && product.getStockQuantity() > 0) {
                product.setStatus(ProductStatus.ACTIVE);
            }
        }

        order.setStatus(OrderStatus.CANCELLED);
        Order savedOrder = orderRepository.save(order);
        return OrderResponse.from(savedOrder, orderItems);
    }

    private void validateProductForCheckout(Product product, User buyer, int quantity) {
        if (product.getStatus() != ProductStatus.ACTIVE) {
            throw ApiException.badRequest("Product is not active");
        }
        if (product.getSeller().getId().equals(buyer.getId())) {
            throw ApiException.badRequest("Cannot buy your own product");
        }
        if (quantity > product.getStockQuantity()) {
            throw ApiException.badRequest("Quantity exceeds available stock");
        }
    }

    private void requireOrderAccess(Order order, User currentUser) {
        if (currentUser.getRole() != UserRole.ADMIN && !order.getBuyer().getId().equals(currentUser.getId())) {
            throw ApiException.forbidden("Forbidden");
        }
    }

    private String generateOrderCode() {
        String code;
        do {
            code = "ORD" + java.time.LocalDateTime.now().format(ORDER_CODE_TIME)
                    + ThreadLocalRandom.current().nextInt(1000, 10000);
        } while (orderRepository.existsByOrderCode(code));
        return code;
    }

    private User getCurrentUser(String email) {
        if (email == null || email.isBlank()) {
            throw ApiException.unauthorized("Unauthorized");
        }
        return userRepository.findByEmail(email.trim().toLowerCase(Locale.ROOT))
                .orElseThrow(() -> ApiException.unauthorized("Invalid or expired token"));
    }

    private String normalizeNullable(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return value.trim();
    }
}
