🏠 Smart Interior Platform

Nền tảng thương mại và tư vấn nội thất thông minh sử dụng AI

📌 Giới thiệu

Smart Interior Platform là một hệ thống web cho phép người dùng:

Khám phá và mua sắm các sản phẩm nội thất Tìm kiếm và lọc sản phẩm theo nhu cầu (phòng, phong cách, giá...) Nhận gợi ý sản phẩm thông minh từ AI Sử dụng chatbot để tư vấn lựa chọn nội thất phù hợp

Hệ thống được thiết kế theo kiến trúc hiện đại, tách biệt frontend, backend và AI service.

🧠 Công nghệ sử dụng Thành phần Công nghệ Frontend React (Vite) Backend Java Spring Boot AI Service Python (FastAPI / ML) Database MySQL Build Tool Maven (backend), npm (frontend) IDE IntelliJ IDEA, VS Code 🏗️ Kiến trúc hệ thống

Hệ thống sử dụng kiến trúc:

Client–Server Architecture

Layered Backend
AI Microservice Sơ đồ tổng thể React Frontend ↓ HTTP REST API Java Spring Boot Backend ↓ JPA / JDBC MySQL Database
Java Backend ↓ HTTP API Python AI Service ⚙️ Mô hình thiết kế 🔹 Frontend Component-Based Architecture Tổ chức theo: Components Pages Services (API calls) Hooks / Context 🔹 Backend Layered Architecture: Controller → Service → Repository → Model Các module chính: Auth User Product Category Cart Order Review AI Integration 🔹 AI Service Microservice độc lập Chức năng: Gợi ý sản phẩm Phân loại phong cách nội thất Chatbot tư vấn 🔹 Database MySQL Mô hình quan hệ (Relational Database) 🚀 Chức năng chính 👤 Người dùng Đăng ký / đăng nhập Xem danh sách sản phẩm Tìm kiếm & lọc sản phẩm Xem chi tiết sản phẩm Thêm vào giỏ hàng Đặt hàng Đánh giá sản phẩm Nhận gợi ý từ AI Chatbot tư vấn nội thất 🛠️ Admin Quản lý sản phẩm Quản lý danh mục Quản lý người dùng Quản lý đơn hàng Theo dõi hệ thống AI 🤖 AI Recommendation (gợi ý sản phẩm) Style Classification (phân loại phong cách) Chatbot hỗ trợ người dùng 📁 Cấu trúc thư mục smart-interior-platform/ │ ├── frontend/ # React client ├── backend/ # Java Spring Boot (Maven) ├── ai-service/ # Python AI service ├── database/ # MySQL schema & migrations ├── docs/ # UML, API spec, tài liệu │ ├── .gitignore └── README.md ▶️ Cách chạy dự án

Backend (Java) cd backend mvn spring-boot:run
Frontend (React) cd frontend npm install npm run dev
AI Service (Python) cd ai-service pip install -r requirements.txt uvicorn app.main:app --reload
Database (MySQL) Import file trong database/schema.sql Cấu hình connection trong application.properties 🔗 API Flow (ví dụ) Lấy danh sách sản phẩm React → Backend → MySQL → Backend → React Gợi ý sản phẩm React → Backend → Python AI → Model → Backend → React Chatbot React → Backend → Python → Chatbot → Backend → React 🎯 Mục tiêu dự án Áp dụng kiến trúc hệ thống thực tế (Client–Server + Microservice) Kết hợp giữa: Web development (React + Java) Machine Learning (Python) Xây dựng một sản phẩm có giá trị thực tiễn 📌 Ghi chú Backend và AI service chạy độc lập Không kết nối trực tiếp từ frontend đến AI Backend là trung tâm xử lý logic 👨‍💻 Tác giả Họ tên: Nguyễn Hữu Hùng GitHub: (link repo của bạn)