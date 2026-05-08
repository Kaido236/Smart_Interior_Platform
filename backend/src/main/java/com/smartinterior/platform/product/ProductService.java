package com.smartinterior.platform.product;

import com.smartinterior.platform.common.ApiException;
import com.smartinterior.platform.product.dto.ProductCreateRequest;
import com.smartinterior.platform.product.dto.ProductPageResponse;
import com.smartinterior.platform.product.dto.ProductResponse;
import com.smartinterior.platform.product.dto.ProductSearchRequest;
import com.smartinterior.platform.product.dto.ProductUpdateRequest;
import com.smartinterior.platform.user.User;
import com.smartinterior.platform.user.UserRepository;
import com.smartinterior.platform.user.UserRole;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import java.math.BigDecimal;
import java.text.Normalizer;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductService {

    private static final int DEFAULT_PAGE = 0;
    private static final int DEFAULT_SIZE = 12;
    private static final int MAX_SIZE = 60;
    private static final String DEFAULT_CATEGORY = "Furniture";

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    public ProductService(
            ProductRepository productRepository,
            CategoryRepository categoryRepository,
            UserRepository userRepository
    ) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public ProductPageResponse searchProducts(ProductSearchRequest request) {
        Pageable pageable = PageRequest.of(resolvePage(request.page()), resolveSize(request.size()), resolveSort(request.sort()));
        Page<Product> page = productRepository.findAll(buildSpecification(request), pageable);
        List<ProductResponse> items = page.getContent().stream()
                .map(ProductResponse::from)
                .toList();

        return new ProductPageResponse(
                items,
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages()
        );
    }

    @Transactional(readOnly = true)
    public ProductResponse getProduct(Long id, String currentUserEmail) {
        Product product = findExistingProduct(id);
        if (product.getStatus() == ProductStatus.HIDDEN && !canManage(product, currentUserEmail)) {
            throw ApiException.forbidden("Forbidden");
        }
        return ProductResponse.from(product);
    }

    @Transactional
    public ProductResponse createProduct(ProductCreateRequest request, String currentUserEmail) {
        User seller = getCurrentUser(currentUserEmail);

        Product product = new Product();
        product.setSeller(seller);
        product.setCategory(resolveCategory(request.category()));
        product.setName(request.name().trim());
        product.setSlug(generateUniqueProductSlug(request.name(), null));
        product.setDescription(normalizeNullable(request.description()));
        product.setShortDescription(buildShortDescription(request.description()));
        product.setPrice(request.price());
        product.setStockQuantity(request.stockQuantity());
        product.setMaterial(normalizeNullable(request.material()));
        product.setColor(normalizeNullable(request.color()));
        product.setStyle(normalizeNullable(request.style()));
        product.setRoomType(normalizeNullable(request.roomType()));
        product.setWidth(request.width());
        product.setHeight(request.height());
        product.setDepth(request.depth());
        product.setImageUrl(normalizeNullable(request.imageUrl()));
        product.setStatus(ProductStatus.ACTIVE);

        return ProductResponse.from(productRepository.save(product));
    }

    @Transactional
    public ProductResponse updateProduct(Long id, ProductUpdateRequest request, String currentUserEmail) {
        Product product = findExistingProduct(id);
        requireManagePermission(product, currentUserEmail);

        if (request.name() != null) {
            if (request.name().isBlank()) {
                throw ApiException.badRequest("name: must not be blank");
            }
            String trimmedName = request.name().trim();
            product.setName(trimmedName);
            product.setSlug(generateUniqueProductSlug(trimmedName, product.getId()));
        }
        if (request.description() != null) {
            product.setDescription(normalizeNullable(request.description()));
            product.setShortDescription(buildShortDescription(request.description()));
        }
        if (request.price() != null) {
            product.setPrice(request.price());
        }
        if (request.category() != null) {
            product.setCategory(resolveCategory(request.category()));
        }
        if (request.material() != null) {
            product.setMaterial(normalizeNullable(request.material()));
        }
        if (request.color() != null) {
            product.setColor(normalizeNullable(request.color()));
        }
        if (request.style() != null) {
            product.setStyle(normalizeNullable(request.style()));
        }
        if (request.roomType() != null) {
            product.setRoomType(normalizeNullable(request.roomType()));
        }
        if (request.width() != null) {
            product.setWidth(request.width());
        }
        if (request.height() != null) {
            product.setHeight(request.height());
        }
        if (request.depth() != null) {
            product.setDepth(request.depth());
        }
        if (request.imageUrl() != null) {
            product.setImageUrl(normalizeNullable(request.imageUrl()));
        }
        if (request.status() != null) {
            if (request.status() == ProductStatus.DELETED) {
                throw ApiException.badRequest("Use delete product API for soft delete");
            }
            product.setStatus(request.status());
        }
        if (request.stockQuantity() != null) {
            product.setStockQuantity(request.stockQuantity());
            if (request.stockQuantity() == 0) {
                product.setStatus(ProductStatus.OUT_OF_STOCK);
            } else if (request.status() == null && product.getStatus() == ProductStatus.OUT_OF_STOCK) {
                product.setStatus(ProductStatus.ACTIVE);
            }
        }

        return ProductResponse.from(productRepository.save(product));
    }

    @Transactional
    public void softDeleteProduct(Long id, String currentUserEmail) {
        Product product = findExistingProduct(id);
        requireManagePermission(product, currentUserEmail);
        product.setStatus(ProductStatus.DELETED);
        productRepository.save(product);
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> getMyProducts(String currentUserEmail) {
        User seller = getCurrentUser(currentUserEmail);
        return productRepository.findBySellerIdAndStatusNotOrderByCreatedAtDesc(seller.getId(), ProductStatus.DELETED)
                .stream()
                .map(ProductResponse::from)
                .toList();
    }

    private Specification<Product> buildSpecification(ProductSearchRequest request) {
        return (root, query, criteriaBuilder) -> {
            query.distinct(true);
            List<Predicate> predicates = new ArrayList<>();
            var categoryJoin = root.join("category", JoinType.LEFT);

            predicates.add(criteriaBuilder.equal(root.get("status"), ProductStatus.ACTIVE));

            String keyword = normalizeNullable(request.keyword());
            if (keyword != null) {
                String likeKeyword = "%" + keyword.toLowerCase(Locale.ROOT) + "%";
                predicates.add(criteriaBuilder.or(
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), likeKeyword),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("description")), likeKeyword),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("slug")), likeKeyword),
                        criteriaBuilder.like(criteriaBuilder.lower(categoryJoin.get("name")), likeKeyword),
                        criteriaBuilder.like(criteriaBuilder.lower(categoryJoin.get("slug")), likeKeyword)
                ));
            }

            String category = normalizeNullable(request.category());
            if (category != null) {
                String likeCategory = "%" + category.toLowerCase(Locale.ROOT) + "%";
                predicates.add(criteriaBuilder.or(
                        criteriaBuilder.like(criteriaBuilder.lower(categoryJoin.get("name")), likeCategory),
                        criteriaBuilder.like(criteriaBuilder.lower(categoryJoin.get("slug")), likeCategory)
                ));
            }

            String roomType = normalizeNullable(request.roomType());
            if (roomType != null) {
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("roomType")),
                        "%" + roomType.toLowerCase(Locale.ROOT) + "%"
                ));
            }

            String style = normalizeNullable(request.style());
            if (style != null) {
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("style")),
                        "%" + style.toLowerCase(Locale.ROOT) + "%"
                ));
            }

            BigDecimal minPrice = request.minPrice();
            if (minPrice != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("price"), minPrice));
            }

            BigDecimal maxPrice = request.maxPrice();
            if (maxPrice != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("price"), maxPrice));
            }

            return criteriaBuilder.and(predicates.toArray(Predicate[]::new));
        };
    }

    private Product findExistingProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> ApiException.notFound("Product not found"));
        if (product.getStatus() == ProductStatus.DELETED) {
            throw ApiException.notFound("Product not found");
        }
        return product;
    }

    private void requireManagePermission(Product product, String currentUserEmail) {
        if (!canManage(product, currentUserEmail)) {
            throw ApiException.forbidden("Forbidden");
        }
    }

    private boolean canManage(Product product, String currentUserEmail) {
        if (currentUserEmail == null || currentUserEmail.isBlank()) {
            return false;
        }
        User currentUser = getCurrentUser(currentUserEmail);
        return currentUser.getRole() == UserRole.ADMIN || product.getSeller().getId().equals(currentUser.getId());
    }

    private User getCurrentUser(String email) {
        if (email == null || email.isBlank()) {
            throw ApiException.unauthorized("Unauthorized");
        }
        return userRepository.findByEmail(email.trim().toLowerCase(Locale.ROOT))
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "Invalid or expired token"));
    }

    private Category resolveCategory(String categoryName) {
        String resolvedName = normalizeNullable(categoryName);
        if (resolvedName == null) {
            resolvedName = DEFAULT_CATEGORY;
        }
        String name = resolvedName;
        String slug = toSlug(name);

        return categoryRepository.findByNameIgnoreCase(name)
                .or(() -> categoryRepository.findBySlug(slug))
                .orElseGet(() -> {
                    Category category = new Category();
                    category.setName(name);
                    category.setSlug(generateUniqueCategorySlug(name));
                    category.setStatus("ACTIVE");
                    return categoryRepository.save(category);
                });
    }

    private Sort resolveSort(String sort) {
        if ("price_asc".equalsIgnoreCase(sort)) {
            return Sort.by(Sort.Direction.ASC, "price");
        }
        if ("price_desc".equalsIgnoreCase(sort)) {
            return Sort.by(Sort.Direction.DESC, "price");
        }
        return Sort.by(Sort.Direction.DESC, "createdAt");
    }

    private int resolvePage(Integer page) {
        return page == null || page < 0 ? DEFAULT_PAGE : page;
    }

    private int resolveSize(Integer size) {
        if (size == null || size < 1) {
            return DEFAULT_SIZE;
        }
        return Math.min(size, MAX_SIZE);
    }

    private String buildShortDescription(String description) {
        String normalized = normalizeNullable(description);
        if (normalized == null) {
            return null;
        }
        return normalized.length() <= 160 ? normalized : normalized.substring(0, 157) + "...";
    }

    private String generateUniqueProductSlug(String name, Long excludedId) {
        String base = toSlug(name);
        String candidate = base;
        int counter = 2;
        while (excludedId == null
                ? productRepository.existsBySlug(candidate)
                : productRepository.existsBySlugAndIdNot(candidate, excludedId)) {
            candidate = base + "-" + counter;
            counter++;
        }
        return candidate;
    }

    private String generateUniqueCategorySlug(String name) {
        String base = toSlug(name);
        String candidate = base;
        int counter = 2;
        while (categoryRepository.existsBySlug(candidate)) {
            candidate = base + "-" + counter;
            counter++;
        }
        return candidate;
    }

    private String toSlug(String value) {
        String normalized = Normalizer.normalize(value, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "")
                .toLowerCase(Locale.ROOT)
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("(^-|-$)", "");
        return normalized.isBlank() ? "item" : normalized;
    }

    private String normalizeNullable(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return value.trim();
    }
}
