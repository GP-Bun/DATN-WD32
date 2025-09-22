# Quy ước Git Workflow cho Dự án

## 1. Nhánh chính
- **main** → code chạy production (chỉ merge khi release).
- **develop** → code tích hợp, test chung.
- **feature/** → nhánh cho từng chức năng.
- **hotfix/** → sửa lỗi gấp trên production.
- **release/** → chuẩn bị bản phát hành.

## 2. Cách làm việc của mỗi thành viên
1. Luôn cập nhật nhánh `develop`:
   ```bash
   git checkout develop
   git pull origin develop
