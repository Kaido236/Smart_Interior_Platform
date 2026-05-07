package com.smartinterior.platform.product.dto;

import java.math.BigDecimal;

public record ProductSearchRequest(
        String keyword,
        String category,
        BigDecimal minPrice,
        BigDecimal maxPrice,
        String roomType,
        String style,
        String sort,
        Integer page,
        Integer size
) {
}
