# Sử dụng node 20.15.0 làm base image
FROM node:20.15.0-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Copy package.json và package-lock.json (nếu có)
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ source code
COPY . .

# Build ứng dụng
RUN npm run build

# Expose port 3000 (port mặc định của Next.js)
EXPOSE 3000

# Khởi chạy ứng dụng
CMD ["npm", "start"] 