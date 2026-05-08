package com.smartinterior.platform.cart;

import com.smartinterior.platform.cart.dto.AddToCartRequest;
import com.smartinterior.platform.cart.dto.CartResponse;
import com.smartinterior.platform.cart.dto.UpdateCartItemRequest;
import com.smartinterior.platform.common.ApiResponse;
import jakarta.validation.Valid;
import java.security.Principal;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<CartResponse>> getCart(Principal principal) {
        return ResponseEntity.ok(ApiResponse.success("Get cart successfully", cartService.getCart(principal.getName())));
    }

    @PostMapping("/items")
    public ResponseEntity<ApiResponse<CartResponse>> addToCart(
            @Valid @RequestBody AddToCartRequest request,
            Principal principal
    ) {
        return ResponseEntity.ok(ApiResponse.success("Add to cart successfully", cartService.addToCart(request, principal.getName())));
    }

    @PutMapping("/items/{cartItemId}")
    public ResponseEntity<ApiResponse<CartResponse>> updateCartItem(
            @PathVariable Long cartItemId,
            @Valid @RequestBody UpdateCartItemRequest request,
            Principal principal
    ) {
        return ResponseEntity.ok(ApiResponse.success(
                "Update cart item successfully",
                cartService.updateCartItem(cartItemId, request, principal.getName())
        ));
    }

    @DeleteMapping("/items/{cartItemId}")
    public ResponseEntity<ApiResponse<CartResponse>> removeCartItem(@PathVariable Long cartItemId, Principal principal) {
        return ResponseEntity.ok(ApiResponse.success(
                "Remove cart item successfully",
                cartService.removeCartItem(cartItemId, principal.getName())
        ));
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<CartResponse>> clearCart(Principal principal) {
        return ResponseEntity.ok(ApiResponse.success("Clear cart successfully", cartService.clearCart(principal.getName())));
    }
}
