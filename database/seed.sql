SET NAMES utf8mb4;

INSERT INTO users (
    username,
    email,
    password_hash,
    full_name,
    role,
    status
) VALUES (
    'admin',
    'admin@example.com',
    '$2a$10$placeholder-change-me-before-production',
    'System Admin',
    'ADMIN',
    'ACTIVE'
)
ON DUPLICATE KEY UPDATE
    role = 'ADMIN',
    status = 'ACTIVE',
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO categories (name, slug, description, parent_id, status) VALUES
('Phòng khách', 'phong-khach', 'Danh mục nội thất dành cho phòng khách.', NULL, 'ACTIVE'),
('Phòng ngủ', 'phong-ngu', 'Danh mục nội thất dành cho phòng ngủ.', NULL, 'ACTIVE'),
('Phòng bếp', 'phong-bep', 'Danh mục nội thất dành cho phòng bếp.', NULL, 'ACTIVE'),
('Decor', 'decor', 'Đồ trang trí và phụ kiện nội thất.', NULL, 'ACTIVE')
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    description = VALUES(description),
    parent_id = VALUES(parent_id),
    status = VALUES(status);

SET @phong_khach_id = (SELECT category_id FROM categories WHERE slug = 'phong-khach');
SET @phong_ngu_id = (SELECT category_id FROM categories WHERE slug = 'phong-ngu');
SET @decor_id = (SELECT category_id FROM categories WHERE slug = 'decor');

INSERT INTO categories (name, slug, description, parent_id, status) VALUES
('Sofa', 'sofa', 'Sofa cho phòng khách.', @phong_khach_id, 'ACTIVE'),
('Bàn trà', 'ban-tra', 'Bàn trà và bàn sofa.', @phong_khach_id, 'ACTIVE'),
('Giường', 'giuong', 'Giường ngủ gia đình.', @phong_ngu_id, 'ACTIVE'),
('Tủ quần áo', 'tu-quan-ao', 'Tủ quần áo và tủ lưu trữ phòng ngủ.', @phong_ngu_id, 'ACTIVE'),
('Đèn trang trí', 'den-trang-tri', 'Đèn cây, đèn bàn và đèn decor.', @decor_id, 'ACTIVE')
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    description = VALUES(description),
    parent_id = VALUES(parent_id),
    status = VALUES(status);

SET @sofa_id = (SELECT category_id FROM categories WHERE slug = 'sofa');
SET @ban_tra_id = (SELECT category_id FROM categories WHERE slug = 'ban-tra');
SET @giuong_id = (SELECT category_id FROM categories WHERE slug = 'giuong');
SET @den_trang_tri_id = (SELECT category_id FROM categories WHERE slug = 'den-trang-tri');
SET @tu_quan_ao_id = (SELECT category_id FROM categories WHERE slug = 'tu-quan-ao');

INSERT INTO products (
    category_id,
    name,
    slug,
    description,
    short_description,
    price,
    sale_price,
    stock_quantity,
    material,
    color,
    style,
    width,
    height,
    depth,
    weight,
    brand,
    status
) VALUES
(
    @sofa_id,
    'Sofa vải màu be',
    'sofa-vai-mau-be',
    'Sofa vải màu be kiểu dáng hiện đại, phù hợp phòng khách căn hộ.',
    'Sofa vải be hiện đại cho phòng khách.',
    8500000.00,
    7900000.00,
    12,
    'Vải bố, khung gỗ',
    'Be',
    'Modern',
    210.00,
    85.00,
    90.00,
    45.00,
    'Smart Interior',
    'ACTIVE'
),
(
    @ban_tra_id,
    'Bàn trà gỗ óc chó',
    'ban-tra-go-oc-cho',
    'Bàn trà mặt gỗ óc chó, thiết kế tối giản và chắc chắn.',
    'Bàn trà gỗ óc chó cho không gian phòng khách.',
    4200000.00,
    NULL,
    10,
    'Gỗ óc chó',
    'Nâu',
    'Minimalist',
    110.00,
    42.00,
    60.00,
    25.00,
    'Smart Interior',
    'ACTIVE'
),
(
    @giuong_id,
    'Giường ngủ phong cách tối giản',
    'giuong-ngu-phong-cach-toi-gian',
    'Giường ngủ phong cách tối giản, dễ phối với nhiều loại nội thất.',
    'Giường ngủ tối giản cho phòng ngủ hiện đại.',
    9500000.00,
    8900000.00,
    8,
    'Gỗ công nghiệp MDF',
    'Trắng',
    'Minimalist',
    180.00,
    95.00,
    200.00,
    65.00,
    'Smart Interior',
    'ACTIVE'
),
(
    @den_trang_tri_id,
    'Đèn cây phòng khách',
    'den-cay-phong-khach',
    'Đèn cây trang trí tạo điểm nhấn ánh sáng cho phòng khách.',
    'Đèn cây decor phòng khách.',
    1800000.00,
    NULL,
    20,
    'Kim loại, vải',
    'Đen',
    'Scandinavian',
    35.00,
    160.00,
    35.00,
    8.00,
    'Smart Interior',
    'ACTIVE'
),
(
    @tu_quan_ao_id,
    'Tủ quần áo gỗ công nghiệp',
    'tu-quan-ao-go-cong-nghiep',
    'Tủ quần áo gỗ công nghiệp nhiều ngăn, phù hợp phòng ngủ gia đình.',
    'Tủ quần áo gỗ công nghiệp nhiều ngăn.',
    7800000.00,
    7300000.00,
    6,
    'Gỗ công nghiệp MDF',
    'Vân gỗ sáng',
    'Modern',
    160.00,
    210.00,
    55.00,
    70.00,
    'Smart Interior',
    'ACTIVE'
)
ON DUPLICATE KEY UPDATE
    category_id = VALUES(category_id),
    name = VALUES(name),
    description = VALUES(description),
    short_description = VALUES(short_description),
    price = VALUES(price),
    sale_price = VALUES(sale_price),
    stock_quantity = VALUES(stock_quantity),
    material = VALUES(material),
    color = VALUES(color),
    style = VALUES(style),
    width = VALUES(width),
    height = VALUES(height),
    depth = VALUES(depth),
    weight = VALUES(weight),
    brand = VALUES(brand),
    status = VALUES(status);

INSERT INTO community_posts (author_id, title, content, post_type, status)
SELECT admin.user_id,
       'Góc phòng khách tối giản của tôi',
       'Mình chọn sofa màu be, bàn trà gỗ và một đèn cây để giữ không gian gọn, sáng và dễ sinh hoạt.',
       'SHOWCASE',
       'VISIBLE'
FROM users AS admin
WHERE admin.username = 'admin'
  AND NOT EXISTS (
      SELECT 1 FROM community_posts
      WHERE title = 'Góc phòng khách tối giản của tôi'
        AND author_id = admin.user_id
  );

INSERT INTO community_posts (author_id, title, content, post_type, status)
SELECT admin.user_id,
       'Nên chọn sofa vải hay sofa da?',
       'Mọi người cho mình xin kinh nghiệm chọn sofa cho nhà có trẻ nhỏ: nên dùng sofa vải hay sofa da?',
       'QUESTION',
       'VISIBLE'
FROM users AS admin
WHERE admin.username = 'admin'
  AND NOT EXISTS (
      SELECT 1 FROM community_posts
      WHERE title = 'Nên chọn sofa vải hay sofa da?'
        AND author_id = admin.user_id
  );

INSERT INTO community_posts (author_id, title, content, post_type, status)
SELECT admin.user_id,
       '5 mẹo decor phòng ngủ nhỏ',
       'Ưu tiên màu sáng, dùng nội thất nhiều ngăn, tận dụng ánh sáng tự nhiên, chọn giường thấp và hạn chế đồ trang trí rườm rà.',
       'TIP',
       'VISIBLE'
FROM users AS admin
WHERE admin.username = 'admin'
  AND NOT EXISTS (
      SELECT 1 FROM community_posts
      WHERE title = '5 mẹo decor phòng ngủ nhỏ'
        AND author_id = admin.user_id
  );
