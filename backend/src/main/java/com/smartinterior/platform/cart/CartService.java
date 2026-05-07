package com.smartinterior.platform.cart;

import com.smartinterior.platform.cart.dto.AddToCartRequest;
import com.smartinterior.platform.cart.dto.CartItemResponse;
import com.smartinterior.platform.cart.dto.CartResponse;
import com.smartinterior.platform.cart.dto.UpdateCartItemRequest;
import com.smartinterior.platform.common.ApiException;
import com.smartinterior.platform.product.Product;
import com.smartinterior.platform.product.ProductRepository;
import com.smartinterior.platform.product.ProductStatus;
import com.smartinterior.platform.user.User;
import com.smartinterior.platform.user.UserRepository;
import java.math.BigDecimal;
import java.util.List;
import java.util.Locale;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public CartService(
            CartRepository cartRepository,
            CartItemRepository cartItemRepository,
            ProductRepository productRepository,
            UserRepository userRepository
    ) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public CartResponse getCart(String currentUserEmail) {
        Cart cart = getOrCreateCart(getCurrentUser(currentUserEmail));
        return buildCartResponse(cart);
    }

    @Transactional
    public CartResponse addToCart(AddToCartRequest request, String currentUserEmail) {
        User user = getCurrentUser(currentUserEmail);
        Cart cart = getOrCreateCart(user);
        Product product = productRepository.findById(request.productId())
                .orElseThrow(() -> ApiException.notFound("Product not found"));

        validateProductCanBePurchased(product, user);

        CartItem cartItem = cartItemRepository.findByCartIdAndProductId(cart.getId(), product.getId())
                .orElseGet(() -> {
                    CartItem item = new CartItem();
                    item.setCart(cart);
                    item.setProduct(product);
                    item.setQuantity(0);
                    item.setUnitPrice(product.getPrice());
                    return item;
                });

        int nextQuantity = cartItem.getQuantity() + request.quantity();
        validateStock(product, nextQuantity);
        cartItem.setQuantity(nextQuantity);
        cartItem.setUnitPrice(product.getPrice());
        cartItemRepository.save(cartItem);

        return buildCartResponse(cart);
    }

    @Transactional
    public CartResponse updateCartItem(Long cartItemId, UpdateCartItemRequest request, String currentUserEmail) {
        User user = getCurrentUser(currentUserEmail);
        CartItem cartItem = getOwnedCartItem(cartItemId, user);
        Product product = cartItem.getProduct();

        if (product.getStatus() != ProductStatus.ACTIVE) {
            throw ApiException.badRequest("Product is not active");
        }
        validateStock(product, request.quantity());
        cartItem.setQuantity(request.quantity());
        cartItem.setUnitPrice(product.getPrice());
        cartItemRepository.save(cartItem);

        return buildCartResponse(cartItem.getCart());
    }

    @Transactional
    public CartResponse removeCartItem(Long cartItemId, String currentUserEmail) {
        User user = getCurrentUser(currentUserEmail);
        CartItem cartItem = getOwnedCartItem(cartItemId, user);
        Cart cart = cartItem.getCart();
        cartItemRepository.delete(cartItem);
        return buildCartResponse(cart);
    }

    @Transactional
    public CartResponse clearCart(String currentUserEmail) {
        Cart cart = getOrCreateCart(getCurrentUser(currentUserEmail));
        cartItemRepository.deleteByCartId(cart.getId());
        return buildCartResponse(cart);
    }

    private CartResponse buildCartResponse(Cart cart) {
        List<CartItemResponse> items = cartItemRepository.findByCartIdOrderByCreatedAtAsc(cart.getId())
                .stream()
                .map(CartItemResponse::from)
                .toList();
        BigDecimal totalAmount = items.stream()
                .map(CartItemResponse::subtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        return new CartResponse(cart.getId(), items, totalAmount);
    }

    private Cart getOrCreateCart(User user) {
        return cartRepository.findByUserId(user.getId())
                .orElseGet(() -> {
                    Cart cart = new Cart();
                    cart.setUser(user);
                    return cartRepository.save(cart);
                });
    }

    private CartItem getOwnedCartItem(Long cartItemId, User user) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> ApiException.notFound("Cart item not found"));
        if (!cartItem.getCart().getUser().getId().equals(user.getId())) {
            throw ApiException.forbidden("Forbidden");
        }
        return cartItem;
    }

    private void validateProductCanBePurchased(Product product, User buyer) {
        if (product.getStatus() == ProductStatus.DELETED) {
            throw ApiException.notFound("Product not found");
        }
        if (product.getStatus() != ProductStatus.ACTIVE) {
            throw ApiException.badRequest("Product is not active");
        }
        if (product.getSeller().getId().equals(buyer.getId())) {
            throw ApiException.badRequest("Cannot buy your own product");
        }
    }

    private void validateStock(Product product, int quantity) {
        if (quantity > product.getStockQuantity()) {
            throw ApiException.badRequest("Quantity exceeds available stock");
        }
    }

    private User getCurrentUser(String email) {
        if (email == null || email.isBlank()) {
            throw ApiException.unauthorized("Unauthorized");
        }
        return userRepository.findByEmail(email.trim().toLowerCase(Locale.ROOT))
                .orElseThrow(() -> ApiException.unauthorized("Invalid or expired token"));
    }
}
