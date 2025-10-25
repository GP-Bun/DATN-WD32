<p align="center">
  <a href="https://laravel.com" target="_blank">
    <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo">
  </a>
</p>

<p align="center">
  <a href="https://github.com/laravel/framework/actions">
    <img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status">
  </a>
  <a href="https://packagist.org/packages/laravel/framework">
    <img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads">
  </a>
  <a href="https://packagist.org/packages/laravel/framework">
    <img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version">
  </a>
  <a href="https://packagist.org/packages/laravel/framework">
    <img src="https://img.shields.io/packagist/l/laravel/framework" alt="License">
  </a>
</p>

---

# 🐾 DỰ ÁN: WEBSITE BÁN GIÀY (DATN-WD32)

## 👨‍💻 Thông tin nhóm
- **Ngành:** Thiết kế Website – Cao đẳng FPT Polytechnic  
- **Môn:** Đồ án tốt nghiệp (DATN-WD32)  
- **Giảng viên hướng dẫn:** Nguyễn Đức Anh  
- **Thành viên thực hiện:**  
  - Nguyễn Đức Nhân (feature/Nhan)  
  - Thành viên khác: Hào, Hiệp, Thành, Trung, ...

---

## 🧩 Công nghệ sử dụng
- **Framework:** Laravel 11  
- **CSDL:** MySQL  
- **Front-end:** Blade + TailwindCSS + Vite  
- **Quản lý gói:** Composer / NPM  
- **Giao diện quản trị:** AdminLTE  
- **Công cụ phát triển:** Laragon / VS Code / GitHub

---

## 🚀 Hướng dẫn cài đặt (Localhost)
```bash
# 1. Clone project
git clone https://github.com/GP-Bun/DATN-WD32.git

# 2. Truy cập thư mục
cd DATN-WD32

# 3. Cài đặt Composer
composer install

# 4. Cài đặt NPM
npm install && npm run dev

# 5. Tạo file .env
cp .env.example .env

# 6. Cấu hình DB trong file .env
# (ví dụ)
DB_DATABASE=datn_wd32
DB_USERNAME=root
DB_PASSWORD=

# 7. Chạy migrate
php artisan migrate

# 8. Chạy server
php artisan serve
