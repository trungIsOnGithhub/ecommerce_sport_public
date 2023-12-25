# doan_hk232

> Tải Node JS v18.19.0, tại [đây](https://nodejs.org/download/release/v18.19.0/node-v18.19.0-x64.msi), chạy file msi vừa tải từ link trên để cài đặt.

> Tải MongoDB phiên bản 6.0.12, tại [đây](https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-6.0.12-signed.msi), chạy file msi vừa tải từ link trên để cài đặt.

## Hướng Dẫn Init Source Code

#### Setup CSDL

1. đảm bảo database đang chạy trên port 27017

2. từ MongoDB Compass(mặc định hiện ra sau khi cài đặt) hoặc cmd connect DB tại địa chỉ ```mongodb://localhost:27017```

3. tạo database mới ```hihi``` với collection tên bất kì

#### khởi động BE

Run các lệnh cmd sau lần lượt

1. ```npm install``` ở lần đầu tiên

2. ```npm run dev```
    hoặc để load nhanh hơn:
    ```npm run build```
    ```npm run start``

3. Theo dõi console để xác nhận connect DB thành công, các bảng sẽ tự tạo trong db ```hihi``` khi connect db thành công

#### khởi động FE

Run các lệnh cmd sau lần lượt

1. ```npm install``` ở lần đầu tiên

2. ```npm run dev```
    hoặc để load nhanh hơn:
    ```npm run build```
    ```npm run start```

// FE khởi động chậm ở lần đầu

Truy cập ```localhost:3000``` cho trang web, ```localhost:3001``` cho api