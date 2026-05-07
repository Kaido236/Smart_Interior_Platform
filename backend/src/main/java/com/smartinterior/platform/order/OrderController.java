package com.smartinterior.platform.order;

import com.smartinterior.platform.common.ApiResponse;
import com.smartinterior.platform.order.dto.CheckoutRequest;
import com.smartinterior.platform.order.dto.OrderResponse;
import jakarta.validation.Valid;
import java.security.Principal;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/checkout")
    public ResponseEntity<ApiResponse<OrderResponse>> checkout(
            @Valid @RequestBody CheckoutRequest request,
            Principal principal
    ) {
        return ResponseEntity.ok(ApiResponse.success(
                "Checkout successfully",
                orderService.checkout(request, principal.getName())
        ));
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<OrderResponse>>> getMyOrders(Principal principal) {
        return ResponseEntity.ok(ApiResponse.success(
                "Get my orders successfully",
                orderService.getMyOrders(principal.getName())
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<OrderResponse>> getOrder(@PathVariable Long id, Principal principal) {
        return ResponseEntity.ok(ApiResponse.success(
                "Get order successfully",
                orderService.getOrder(id, principal.getName())
        ));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<ApiResponse<OrderResponse>> cancelOrder(@PathVariable Long id, Principal principal) {
        return ResponseEntity.ok(ApiResponse.success(
                "Cancel order successfully",
                orderService.cancelOrder(id, principal.getName())
        ));
    }
}
