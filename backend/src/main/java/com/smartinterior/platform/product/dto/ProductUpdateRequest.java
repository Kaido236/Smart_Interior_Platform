package com.smartinterior.platform.product.dto;

import com.smartinterior.platform.product.ProductStatus;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;

public record ProductUpdateRequest(
        @Size(max = 200) String name,
        @Size(max = 5000) String description,
        @Positive BigDecimal price,
        @Min(0) Integer stockQuantity,
        @Size(max = 100) String category,
        @Size(max = 100) String material,
        @Size(max = 100) String color,
        @Size(max = 100) String style,
        @Size(max = 100) String roomType,
        Double width,
        Double height,
        Double depth,
        @Size(max = 2000) String imageUrl,
        ProductStatus status
) {
}
