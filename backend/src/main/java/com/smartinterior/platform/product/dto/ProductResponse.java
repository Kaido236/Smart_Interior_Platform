package com.smartinterior.platform.product.dto;

import com.smartinterior.platform.product.Product;
import com.smartinterior.platform.product.ProductStatus;
import java.math.BigDecimal;

public record ProductResponse(
        Long id,
        String name,
        String description,
        String shortDescription,
        BigDecimal price,
        Integer stockQuantity,
        String category,
        String material,
        String color,
        String style,
        String roomType,
        Double width,
        Double height,
        Double depth,
        String imageUrl,
        ProductStatus status,
        Long sellerId,
        String sellerName
) {

    public static ProductResponse from(Product product) {
        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getShortDescription(),
                product.getPrice(),
                product.getStockQuantity(),
                product.getCategory().getName(),
                product.getMaterial(),
                product.getColor(),
                product.getStyle(),
                product.getRoomType(),
                product.getWidth(),
                product.getHeight(),
                product.getDepth(),
                product.getImageUrl(),
                product.getStatus(),
                product.getSeller().getId(),
                product.getSeller().getFullName()
        );
    }
}
