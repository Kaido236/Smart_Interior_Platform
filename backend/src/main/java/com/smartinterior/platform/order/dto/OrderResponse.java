package com.smartinterior.platform.order.dto;

import com.smartinterior.platform.order.Order;
import com.smartinterior.platform.order.OrderItem;
import com.smartinterior.platform.order.OrderStatus;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record OrderResponse(
        Long id,
        Long buyerId,
        String orderCode,
        BigDecimal totalAmount,
        OrderStatus status,
        String receiverName,
        String receiverPhone,
        String shippingAddress,
        String note,
        LocalDateTime createdAt,
        List<OrderItemResponse> items
) {

    public static OrderResponse from(Order order, List<OrderItem> items) {
        return new OrderResponse(
                order.getId(),
                order.getBuyer().getId(),
                order.getOrderCode(),
                order.getTotalAmount(),
                order.getStatus(),
                order.getReceiverName(),
                order.getReceiverPhone(),
                order.getShippingAddress(),
                order.getNote(),
                order.getCreatedAt(),
                items.stream().map(OrderItemResponse::from).toList()
        );
    }
}
