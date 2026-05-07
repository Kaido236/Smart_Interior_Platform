package com.smartinterior.platform.order.dto;

import com.smartinterior.platform.order.OrderItem;
import java.math.BigDecimal;

public record OrderItemResponse(
        Long id,
        Long productId,
        Long sellerId,
        String productName,
        String imageUrl,
        BigDecimal unitPrice,
        Integer quantity,
        BigDecimal subtotal
) {

    public static OrderItemResponse from(OrderItem item) {
        Long productId = item.getProduct() == null ? null : item.getProduct().getId();
        return new OrderItemResponse(
                item.getId(),
                productId,
                item.getSeller().getId(),
                item.getProductName(),
                item.getProductImage(),
                item.getUnitPrice(),
                item.getQuantity(),
                item.getSubtotal()
        );
    }
}
