package com.smartinterior.platform.product.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;

public record ProductCreateRequest(
        @NotBlank @Size(max = 200) String name,
        @Size(max = 5000) String description,
        @NotNull @Positive BigDecimal price,
        @NotNull @Min(1) Integer stockQuantity,
        @Size(max = 100) String category,
        @Size(max = 100) String material,
        @Size(max = 100) String color,
        @Size(max = 100) String style,
        @Size(max = 100) String roomType,
        Double width,
        Double height,
        Double depth,
        @Size(max = 2000) String imageUrl
) {
}
