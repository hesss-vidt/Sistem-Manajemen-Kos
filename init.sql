CREATE DATABASE IF NOT EXISTS kos_db;
USE kos_db;

-- 1. Resource: Pengguna
CREATE TABLE pengguna (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'penyewa') DEFAULT 'penyewa',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Resource: Kamar
CREATE TABLE kamar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nomor_kamar VARCHAR(10) UNIQUE NOT NULL,
    tipe_kamar VARCHAR(50) NOT NULL,
    harga_per_bulan DECIMAL(10,2) NOT NULL,
    status ENUM('tersedia', 'dihuni', 'perbaikan') DEFAULT 'tersedia'
);

-- 3. Resource: Penyewa
CREATE TABLE penyewa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_pengguna INT UNIQUE NOT NULL, 
    nama_lengkap VARCHAR(100) NOT NULL,
    asal_kota VARCHAR(50),
    no_hp VARCHAR(20) NOT NULL,
    FOREIGN KEY (id_pengguna) REFERENCES pengguna(id) ON DELETE CASCADE
);

-- 4. Resource: Kontrak
CREATE TABLE kontrak (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_kamar INT NOT NULL,
    id_penyewa INT NOT NULL,
    tanggal_masuk DATE NOT NULL,
    periode_sewa ENUM('bulanan', '3_bulanan', '6_bulanan', 'tahunan') DEFAULT 'bulanan',
    status_sewa ENUM('aktif', 'selesai', 'batal') DEFAULT 'aktif',
    FOREIGN KEY (id_kamar) REFERENCES kamar(id) ON DELETE CASCADE,
    FOREIGN KEY (id_penyewa) REFERENCES penyewa(id) ON DELETE CASCADE
);

-- 5. Resource: Pembayaran
CREATE TABLE pembayaran (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_kontrak INT NOT NULL,
    tanggal_pembayaran TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    jumlah_pembayaran DECIMAL(10,2) NOT NULL,
    metode_pembayaran ENUM('transfer', 'tunai', 'qris') DEFAULT 'transfer',
    status_pembayaran ENUM('pending', 'lunas', 'gagal') DEFAULT 'pending',
    FOREIGN KEY (id_kontrak) REFERENCES kontrak(id) ON DELETE CASCADE
);

-- 6. Resource: Keluhan
CREATE TABLE keluhan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_penyewa INT NOT NULL,
    id_kamar INT NOT NULL,
    judul_laporan VARCHAR(100) NOT NULL,
    deskripsi TEXT NOT NULL,
    status_penanganan ENUM('dilaporkan', 'diproses', 'selesai') DEFAULT 'dilaporkan',
    FOREIGN KEY (id_penyewa) REFERENCES penyewa(id) ON DELETE CASCADE,
    FOREIGN KEY (id_kamar) REFERENCES kamar(id) ON DELETE CASCADE
);

-- ==========================================
-- DATA DUMMY (SEEDER) SISTEM MANAJEMEN KOS
-- ==========================================

-- 1. Data Dummy Tabel Pengguna (1 Admin, 5 Penyewa)
INSERT INTO pengguna (username, password, role) VALUES 
('admin_kos', 'admin123', 'admin'),
('maradu_mhs', 'rahasia123', 'penyewa'),
('andi_santoso', 'rahasia123', 'penyewa'),
('budi_wijaya', 'rahasia123', 'penyewa'),
('citra_lestari', 'rahasia123', 'penyewa'),
('doni_pratama', 'rahasia123', 'penyewa');

-- 2. Data Dummy Tabel Kamar (5 Kamar)
INSERT INTO kamar (nomor_kamar, tipe_kamar, harga_per_bulan, status) VALUES 
('A01', 'Standard AC', 1500000.00, 'dihuni'),
('A02', 'VIP AC', 2000000.00, 'dihuni'),
('B01', 'Standard Non-AC', 800000.00, 'dihuni'),
('B02', 'Standard Non-AC', 800000.00, 'dihuni'),
('C01', 'Paviliun', 3000000.00, 'perbaikan');

-- 3. Data Dummy Tabel Penyewa (5 Penyewa)
INSERT INTO penyewa (id_pengguna, nama_lengkap, asal_kota, no_hp) VALUES 
(2, 'Maradu', 'Medan', '081234567890'),
(3, 'Andi Santoso', 'Jakarta', '081298765432'),
(4, 'Budi Wijaya', 'Bandung', '081312345678'),
(5, 'Citra Lestari', 'Surabaya', '081456789012'),
(6, 'Doni Pratama', 'Padang', '081567890123');

-- 4. Data Dummy Tabel Kontrak (5 Kontrak)
INSERT INTO kontrak (id_kamar, id_penyewa, tanggal_masuk, periode_sewa, status_sewa) VALUES 
(1, 1, '2026-04-01', 'bulanan', 'aktif'),       
(2, 2, '2026-01-15', '6_bulanan', 'aktif'),      
(3, 3, '2025-08-10', 'tahunan', 'aktif'),        
(4, 4, '2026-03-01', '3_bulanan', 'aktif'),      
(1, 5, '2025-01-01', 'bulanan', 'selesai');      

-- 5. Data Dummy Tabel Pembayaran (5 Pembayaran)
INSERT INTO pembayaran (id_kontrak, jumlah_pembayaran, metode_pembayaran, status_pembayaran) VALUES 
(1, 1500000.00, 'transfer', 'lunas'),            
(2, 12000000.00, 'transfer', 'lunas'),           
(3, 9600000.00, 'tunai', 'pending'),             
(4, 2400000.00, 'qris', 'lunas'),                
(5, 1500000.00, 'transfer', 'lunas');            

-- 6. Data Dummy Tabel Keluhan (5 Keluhan)
INSERT INTO keluhan (id_penyewa, id_kamar, judul_laporan, deskripsi, status_penanganan) VALUES 
(1, 1, 'AC Netes Air', 'Permisi min, AC di kamar saya netes air terus ke lantai.', 'dilaporkan'),
(2, 2, 'Gagang Pintu Macet', 'Gagang pintu agak susah diputar kalau mau keluar kamar.', 'selesai'),
(3, 3, 'Lampu Kamar Mandi Mati', 'Tiba-tiba lampu kamar mandi putus kemarin malam.', 'diproses'),
(4, 4, 'Air Keran Kecil', 'Aliran air di wastafel sangat kecil, tolong dicek.', 'dilaporkan'),
(5, 1, 'Kasur Berbunyi', 'Per kasur tidur sudah agak rusak dan berisik.', 'selesai');