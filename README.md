# API Sistem Manajemen Kos
#### API backend untuk mengelola operasional rumah kos secara digital. Sistem ini dirancang untuk menangani pencatatan kamar, penyewa, kontrak sewa, pelacakan pembayaran, hingga pengelolaan keluhan. 
---

## ⚙️ Persiapan & Instalasi
Pastikan komputer Anda sudah terinstal **Node.js**, **MySQL** (bisa menggunakan aplikasi seperti XAMPP atau Laragon), dan aplikasi pengujian API seperti **Postman**.

**1. Clone repositori ini**<br>Buka terminal/command prompt Anda, lalu jalankan perintah berikut untuk mengunduh kode sumber dan masuk ke dalam folder direktori proyek:
```bash
git clone https://github.com/hesss-vidt/Sistem-Manajemen-Kos.git
cd Sistem-Manajemen-Kos
```
**2. Instal dependensi (Library)** <br>Proyek ini membutuhkan beberapa pustaka pihak ketiga untuk berjalan (seperti Express.js dan driver MySQL). Unduh dan instal seluruh dependensi secara otomatis dengan perintah:
```bash
npm install express mysql2 cors dotenv
```
**3. Konfigurasi Database MySQL**<br>Agar API dapat membaca dan menyimpan data, Anda perlu menyetel database di komputer lokal:
- Nyalakan modul Apache dan MySQL di XAMPP Anda.
- Lakukan import query untuk database dari file `init.sql` yang terdapat pada repositori ini ke dalam query SQL pada server yang ada di PhpMyAdmin, Maka database dan tabel tabelnya akan langsung jadi.

**4. Atur Environment (.env)** <br>Sistem ini memisahkan konfigurasi sensitif dari kode utama.
- Buat sebuah file baru dengan nama `.env` di folder utama aplikasi (sejajar dengan file `package.json`).
- Salin format di bawah ini ke dalam file `.env` tersebut, lalu sesuaikan dengan pengaturan database MySQL di komputer Anda:
```bash
# Konfigurasi Server API
PORT=8080
# Konfigurasi Akses Database
DB_HOST=localhost
DB_USER=root
DB_PASS=          # Kosongkan jika MySQL XAMPP Anda default (tidak pakai password)
DB_NAME=kos_db
```
**5. Jalankan Server API**<br>Setelah semua konfigurasi selesai, nyalakan mesin backend dengan menjalankan salah satu perintah berikut di terminal:
```bash
node index.js
```
Jika tidak ada error, Anda akan melihat pesan konfirmasi di terminal bahwa server telah berjalan dengan sukses di `http://localhost:8080` dan koneksi ke database telah berhasil tersambung.

## Dokumentasi API Endpoint
Berikut adalah daftar resource utama yang tersedia pada API ini:<br>
**1. Pengguna**
| Resource   | Method | Endpoint            | Deskripsi                          |
|------------|--------|---------------------|------------------------------------|
| User       | GET    | /users              | Mengambil semua data user          |
| Kamar      | POST   | /kamar              | Menambahkan kamar baru             |
| Pemesanan  | PUT    | /pemesanan/{id}     | Update data pemesanan berdasarkan ID |
| Pembayaran | DELETE | /pembayaran/{id}    | Hapus data pembayaran berdasarkan ID |
