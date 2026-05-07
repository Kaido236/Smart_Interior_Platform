package com.smartinterior.platform.order.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CheckoutRequest(
        @NotBlank @Size(max = 100) String receiverName,
        @NotBlank @Size(max = 20) String receiverPhone,
        @NotBlank @Size(max = 2000) String shippingAddress,
        @Size(max = 5000) String note
) {
}
