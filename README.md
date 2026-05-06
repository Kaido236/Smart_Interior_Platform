# # Smart Interior Platform

Smart Interior Platform là nền tảng nội thất thông minh, hướng tới việc giúp người dùng khám phá sản phẩm nội thất, xem chi tiết sản phẩm, đăng nhập, và trong các phiên bản sau có thể mở rộng thêm đấu giá, chatbot AI, và gợi ý sản phẩm.

## Trạng Thái Hiện Tại

- Frontend khởi điểm đã được xây dựng bằng React + Vite.
- Dữ liệu sản phẩm hiện đang dùng mock data, chưa kết nối backend thật.
- Điều hướng frontend đã dùng React Router.
- Backend, AI service, database và tài liệu hệ thống được tách thành các thư mục riêng để dễ mở rộng.

## Công Nghệ Sử Dụng

| Thành phần | Công nghệ |
| --- | --- |
| Frontend | React, Vite, CSS thuần |
| Routing | React Router DOM |
| Backend | Java Spring Boot |
| AI Service | Python, FastAPI hoặc ML service |
| Database | MySQL |
| Build Tool | npm cho frontend, Maven cho backend |

## Cấu Trúc Thư Mục

```text
Smart_Interior_Platform/
|-- frontend/      # React client
|-- backend/       # Java Spring Boot backend
|-- AI_service/    # Python AI service
|-- database/      # Schema, seed data, migration
|-- docs/          # Tài liệu, UML, API spec
|-- .gitignore
`-- README.md
```

## Cấu Trúc Frontend

```text
frontend/
|-- package.json
|-- index.html
|-- vite.config.js
`-- src/
    |-- assets/
    |-- components/
    |   |-- common/
    |   |   `-- Button.jsx
    |   |-- layout/
    |   |   |-- Navbar.jsx
    |   |   `-- Footer.jsx
    |   `-- product/
    |       `-- ProductCard.jsx
    |-- data/
    |   `-- mockProducts.js
    |-- pages/
    |   |-- HomePage.jsx
    |   |-- ProductsPage.jsx
    |   |-- ProductDetailPage.jsx
    |   |-- LoginPage.jsx
    |   `-- NotFoundPage.jsx
    |-- services/
    |   `-- productService.js
    |-- styles/
    |   `-- global.css
    |-- App.jsx
    `-- main.jsx
```

## Chức Năng Frontend Hiện Có

- Trang chủ giới thiệu nền tảng Smart Interior.
- Trang danh sách sản phẩm nội thất từ dữ liệu mock.
- Trang chi tiết sản phẩm theo route `/products/:id`.
- Trang đăng nhập giả lập.
- Trang 404 cho route không tồn tại.
- Navbar có active link.
- Footer có thông tin liên hệ và liên kết mạng xã hội.

## Route Frontend

| Route | Màn hình |
| --- | --- |
| `/` | Trang chủ |
| `/products` | Danh sách sản phẩm |
| `/products/:id` | Chi tiết sản phẩm |
| `/login` | Đăng nhập giả lập |
| `*` | Trang 404 |

## Cách Chạy Frontend

```bash
cd frontend
npm install
npm run dev
```

Sau khi chạy, mở địa chỉ Vite hiển thị trong terminal, thường là:

```text
http://localhost:5173
```

## Cách Chạy Backend

```bash
cd backend
mvn spring-boot:run
```

## Cách Chạy AI Service

```bash
cd AI_service
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Kiến Trúc Dự Kiến

```text
React Frontend
      |
      | HTTP REST API
      v
Java Spring Boot Backend
      |
      | JPA / JDBC
      v
MySQL Database

Java Spring Boot Backend
      |
      | HTTP API
      v
Python AI Service
```

## Module Có Thể Mở Rộng

- Quản lý người dùng và xác thực thật.
- Quản lý sản phẩm, danh mục, đơn hàng.
- Giỏ hàng và thanh toán.
- Hệ thống đấu giá sản phẩm nội thất.
- Chatbot tư vấn nội thất.
- Gợi ý sản phẩm bằng AI.
- Dashboard quản trị cho admin.

## Nguyên Tắc Phát Triển

- Frontend không gọi trực tiếp AI service.
- Backend là nơi xử lý logic chính và kiểm soát dữ liệu.
- Frontend ưu tiên component đơn giản, rõ ràng, dễ học.
- Mock data hiện tại có thể thay bằng API thật thông qua service layer.

## Liên Hệ

- Tên: Kaido
- Email: [hunggialam2306@gmail.com](mailto:hunggialam2306@gmail.com)
- Phone: 038xxxxxxx
- Facebook: [nguyen.huu.hung.685749](https://www.facebook.com/nguyen.huu.hung.685749/)
- GitHub: [Kaido236](https://github.com/Kaido236)

## Ý Tưởng tham khảo
https://www.decorilla.com/?from=blog-interiordesignwebsites-h2
