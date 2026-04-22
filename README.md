# API Sistem Manajemen Kos
#### API backend untuk mengelola operasional rumah kos secara digital. Sistem ini dirancang untuk menangani pencatatan kamar, penyewa, kontrak sewa, pelacakan pembayaran, hingga pengelolaan keluhan. 

---
Pembagian Tugas :
- M. Altaf Yusnawan Chan (241110745) : Membuat CRUD pada Resource Pengguna, Membuat Laporan Dokumentasi
- Evan Aditya Panjaitan (241111558) : Membuat CRUD pada Resource Kamar, Membuat Laporan Dokumentasi
- Maradu Winner Laurensius (241112149) : Membuat CRUD pada Resource Penyewa dan Kontrak
- Maheswaren (241112528) : Membuat CRUD pada Resource Pembayaran dan Keluhan 
---

## Persiapan & Instalasi
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
| Method | Endpoint        | Deskripsi                                  | Digunakan Oleh |
|--------|-----------------|--------------------------------------------|----------------|
| GET    | `/pengguna`     | Mendapatkan semua data pengguna            | Admin          |
| GET    | `/pengguna/:id` | Mendapatkan detail satu informasi pengguna | Admin          |
| POST   | `/pengguna`     | Menambahkan pengguna atau admin baru       | Pengguna       |
| PUT    | `/pengguna/:id` | Mengubah data dari pengguna                | Pengguna       |
| DELETE | `/pengguna/:id` | Menghapus data pengguna                    | Admin          |

**2. Kamar**
| Method | Endpoint     | Deskripsi                                 | Digunakan Oleh    |
|--------|--------------|-------------------------------------------|-------------------|
| GET    | `/kamar`     | Mendapatkan semua data kamar              | Admin / Pengguna  |
| GET    | `/kamar/:id` | Mendapatkan detail satu informasi kamar   | Admin / Pengguna  |
| POST   | `/kamar`     | Menambahkan data kamar kos baru           | Admin             |
| PUT    | `/kamar/:id` | Mengubah status ketersediaan kamar        | Admin             |
| DELETE | `/kamar/:id` | Menghapus data kamar                      | Admin             |

**3. Penyewa**
| Method | Endpoint       | Deskripsi                                   | Digunakan Oleh   |
|--------|----------------|---------------------------------------------|------------------|
| GET    | `/penyewa`     | Mendapatkan semua data profil penyewa       | Admin            |
| GET    | `/penyewa/:id` | Mendapatkan detail satu penyewa             | Admin / Pengguna |
| POST   | `/penyewa`     | Menambahkan biodata penyewa baru            | Admin            |
| PUT    | `/penyewa/:id` | Mengubah profil penyewa (Nama & Pekerjaan)  | Admin / Pengguna |
| DELETE | `/penyewa/:id` | Menghapus data penyewa                      | Admin            |

**4. Kontrak**
| Method | Endpoint       | Deskripsi                                   | Digunakan Oleh   |
|--------|----------------|---------------------------------------------|------------------|
| GET    | `/kontrak`     | Mendapatkan semua data kontrak kos          | Admin            |
| GET    | `/kontrak/:id` | Mendapatkan detail satu kontrak             | Admin / Pengguna |
| POST   | `/kontrak`     | Membuat dokumen kontrak sewa baru           | Admin            |
| PUT    | `/kontrak/:id` | Mengubah status kontrak (aktif / selesai)   | Admin            |
| DELETE | `/kontrak/:id` | Menghapus data kontrak                      | Admin            |

**5. Pembayaran**
| Method | Endpoint          | Deskripsi                                     | Digunakan Oleh   |
|--------|-------------------|-----------------------------------------------|------------------|
| GET    | `/pembayaran`     | Mendapatkan semua riwayat transaksi           | Admin            |
| GET    | `/pembayaran/:id` | Mendapatkan detail satu transaksi pembayaran  | Admin / Pengguna |
| POST   | `/pembayaran`     | Membuat laporan pembayaran baru               | Admin / Pengguna |
| PUT    | `/pembayaran/:id` | Mengubah status pembayaran (pending ke lunas) | Admin            |
| DELETE | `/pembayaran/:id` | Menghapus riwayat transaksi                   | Admin            |

**6. Keluhan**
| Method | Endpoint       | Deskripsi                                          | Digunakan Oleh   |
|--------|----------------|----------------------------------------------------|------------------|
| GET    | `/keluhan`     | Mendapatkan daftar semua keluhan                   | Admin            |
| GET    | `/keluhan/:id` | Mendapatkan detail status penanganan satu keluhan  | Admin / Pengguna |
| POST   | `/keluhan`     | Membuat laporan keluhan                            | Pengguna         |
| PUT    | `/keluhan/:id` | Mengubah status penanganan (diproses / selesai)    | Admin            |
| DELETE | `/keluhan/:id` | Menghapus laporan keluhan                          | Admin            |
