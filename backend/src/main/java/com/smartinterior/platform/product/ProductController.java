package com.smartinterior.platform.product;

import com.smartinterior.platform.common.ApiResponse;
import com.smartinterior.platform.product.dto.ProductCreateRequest;
import com.smartinterior.platform.product.dto.ProductPageResponse;
import com.smartinterior.platform.product.dto.ProductResponse;
import com.smartinterior.platform.product.dto.ProductSearchRequest;
import com.smartinterior.platform.product.dto.ProductUpdateRequest;
import jakarta.validation.Valid;
import java.math.BigDecimal;
import java.security.Principal;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<ProductPageResponse>> getProducts(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) String roomType,
            @RequestParam(required = false) String style,
            @RequestParam(required = false) String sort,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size
    ) {
        ProductSearchRequest request = new ProductSearchRequest(
                keyword,
                category,
                minPrice,
                maxPrice,
                roomType,
                style,
                sort,
                page,
                size
        );
        return ResponseEntity.ok(ApiResponse.success("Get products successfully", productService.searchProducts(request)));
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<ProductResponse>>> getMyProducts(Principal principal) {
        return ResponseEntity.ok(ApiResponse.success(
                "Get my products successfully",
                productService.getMyProducts(principal.getName())
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductResponse>> getProduct(@PathVariable Long id, Principal principal) {
        String email = principal == null ? null : principal.getName();
        return ResponseEntity.ok(ApiResponse.success(
                "Get product successfully",
                productService.getProduct(id, email)
        ));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ProductResponse>> createProduct(
            @Valid @RequestBody ProductCreateRequest request,
            Principal principal
    ) {
        return ResponseEntity.ok(ApiResponse.success(
                "Create product successfully",
                productService.createProduct(request, principal.getName())
        ));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductResponse>> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProductUpdateRequest request,
            Principal principal
    ) {
        return ResponseEntity.ok(ApiResponse.success(
                "Update product successfully",
                productService.updateProduct(id, request, principal.getName())
        ));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProduct(@PathVariable Long id, Principal principal) {
        productService.softDeleteProduct(id, principal.getName());
        return ResponseEntity.ok(ApiResponse.success("Delete product successfully", null));
    }
}
