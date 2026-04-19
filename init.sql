CREATE DATABASE kos_db;
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
    tipe_kamar ENUM('standar', 'eksklusif') DEFAULT 'standar',
    fasilitas TEXT NOT NULL,
    harga_per_bulan DECIMAL(10,2) NOT NULL,
    status_kamar ENUM('tersedia', 'dihuni') DEFAULT 'tersedia'
);

-- 3. Resource: Penyewa
CREATE TABLE penyewa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_pengguna INT UNIQUE NOT NULL, 
    nama_lengkap VARCHAR(100) NOT NULL,
    jenis_kelamin ENUM('laki-laki', 'perempuan') NOT NULL,
    pekerjaan VARCHAR(50),
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
    tanggal_berakhir DATE NOT NULL,
    periode_sewa ENUM('1_bulan', '3_bulan', '6_bulan', '1_tahun') DEFAULT '1_bulan',
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
    tanggal_laporan TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status_penanganan ENUM('dilaporkan', 'diproses', 'selesai') DEFAULT 'dilaporkan',
    FOREIGN KEY (id_penyewa) REFERENCES penyewa(id) ON DELETE CASCADE,
    FOREIGN KEY (id_kamar) REFERENCES kamar(id) ON DELETE CASCADE
);


-- 1. Data Dummy Tabel Pengguna
INSERT INTO pengguna (username, password, role) VALUES 
('admin_kos', 'admin123', 'admin'),       
('budi_s', 'rahasia123', 'penyewa'),      
('ratih_p', 'rahasia123', 'penyewa'),    
('dimas_a', 'rahasia123', 'penyewa'),
('citra_l', 'rahasia123', 'penyewa'),
('dian_s', 'rahasia123', 'penyewa'),
('eko_p', 'rahasia123', 'penyewa'),
('fani_r', 'rahasia123', 'penyewa'),
('gilang_d', 'rahasia123', 'penyewa'),
('hani_m', 'rahasia123', 'penyewa'),
('intan_n', 'rahasia123', 'penyewa');

-- 2. Data Dummy Tabel Kamar
INSERT INTO kamar (nomor_kamar, tipe_kamar, fasilitas, harga_per_bulan, status_kamar) VALUES 
('A01', 'standar', 'Kasur, Lemari, Kipas Angin, Kamar Mandi Luar', 800000.00, 'dihuni'),
('A02', 'standar', 'Kasur, Lemari, Kipas Angin, Kamar Mandi Luar', 800000.00, 'tersedia'),
('A03', 'standar', 'Kasur, Lemari, Kipas Angin, Kamar Mandi Luar', 800000.00, 'dihuni'),
('A04', 'standar', 'Kasur, Lemari, Kipas Angin, Kamar Mandi Luar', 800000.00, 'dihuni'),
('A05', 'standar', 'Kasur, Lemari, Kipas Angin, Kamar Mandi Luar', 800000.00, 'tersedia'),
('V01', 'eksklusif', 'Kasur, Lemari, AC, TV, WiFi, Kamar Mandi Dalam', 1500000.00, 'tersedia'),
('V02', 'eksklusif', 'Kasur, Lemari, AC, TV, WiFi, Kamar Mandi Dalam', 1500000.00, 'dihuni'),
('V03', 'eksklusif', 'Kasur, Lemari, AC, TV, WiFi, Kamar Mandi Dalam', 1500000.00, 'tersedia'),
('V04', 'eksklusif', 'Kasur, Lemari, AC, TV, WiFi, Kamar Mandi Dalam', 1500000.00, 'dihuni'),
('V05', 'eksklusif', 'Kasur, Lemari, AC, TV, WiFi, Kamar Mandi Dalam', 1500000.00, 'tersedia');

-- 3. Data Dummy Tabel Penyewa 
INSERT INTO penyewa (id_pengguna, nama_lengkap, jenis_kelamin, pekerjaan, asal_kota, no_hp) VALUES 
(2, 'Budi Santoso', 'laki-laki', 'Mahasiswa', 'Jakarta', '081122334455'),
(3, 'Ratih Permatasari', 'perempuan', 'Karyawan Swasta', 'Bandung', '081122334456'),
(4, 'Dimas Anggara', 'laki-laki', 'Mahasiswa', 'Surabaya', '081122334457'),
(5, 'Citra Lestari', 'perempuan', 'Karyawan Swasta', 'Jakarta', '081234567004'),
(6, 'Dian Sastro', 'perempuan', 'Mahasiswa', 'Surabaya', '081234567005'),
(7, 'Eko Pratama', 'laki-laki', 'Freelancer', 'Yogyakarta', '081234567006'),
(8, 'Fani Rahma', 'perempuan', 'Karyawan Swasta', 'Semarang', '081234567007'),
(9, 'Gilang Dirga', 'laki-laki', 'Mahasiswa', 'Malang', '081234567008'),
(10, 'Hani Mutiara', 'perempuan', 'PNS', 'Solo', '081234567009'),
(11, 'Intan Nuraini', 'perempuan', 'Wiraswasta', 'Bali', '081234567010');

-- 4. Data Dummy Tabel Kontrak 
INSERT INTO kontrak (id_kamar, id_penyewa, tanggal_masuk, tanggal_berakhir, periode_sewa, status_sewa) VALUES 
(1, 1, '2026-01-10', '2026-07-10', '6_bulan', 'aktif'),
(2, 2, '2026-03-15', '2026-06-15', '3_bulan', 'aktif'),
(3, 3, '2026-04-01', '2027-04-01', '1_tahun', 'selesai'),
(4, 4, '2026-04-10', '2026-05-10', '1_bulan', 'aktif'),
(5, 5, '2025-10-01', '2026-04-01', '6_bulan', 'selesai'),
(6, 6, '2026-02-20', '2026-08-20', '6_bulan', 'aktif'),
(7, 7, '2026-01-05', '2027-01-05', '1_tahun', 'aktif'),
(8, 8, '2026-04-15', '2026-07-15', '3_bulan', 'aktif'),
(9, 9, '2026-03-01', '2026-04-01', '1_bulan', 'selesai'),
(10, 10, '2025-12-01', '2026-03-01', '3_bulan', 'selesai');      

-- 5. Data Dummy Tabel Pembayaran 
INSERT INTO pembayaran (id_kontrak, jumlah_pembayaran, metode_pembayaran, status_pembayaran) VALUES 
(1, 4800000.00, 'transfer', 'lunas'),
(2, 2400000.00, 'qris', 'lunas'),
(3, 9600000.00, 'transfer', 'lunas'),
(4, 800000.00, 'tunai', 'pending'), 
(5, 4800000.00, 'transfer', 'lunas'),
(6, 9000000.00, 'transfer', 'lunas'),
(7, 18000000.00, 'qris', 'lunas'),
(8, 4500000.00, 'tunai', 'pending'),
(9, 1500000.00, 'transfer', 'lunas'),
(10, 4500000.00, 'transfer', 'lunas');          

-- 6. Data Dummy Tabel Keluhan 
INSERT INTO keluhan (id_penyewa, id_kamar, judul_laporan, deskripsi, status_penanganan) VALUES 
(1, 1, 'Kipas Angin Rusak', 'Kipas angin kadang mati sendiri walau kabel terpasang dengan baik.', 'diproses'),
(2, 2, 'Gagang Pintu Longgar', 'Gagang pintu kamar agak longgar dan susah ditutup rapat.', 'selesai'),
(3, 3, 'Lampu Mati', 'Lampu kamar mendadak putus kemarin malam.', 'dilaporkan'),
(4, 4, 'Air Keran Kecil', 'Aliran air di kamar mandi luar sangat kecil.', 'diproses'),
(5, 5, 'Bocor Saat Hujan', 'Atap rembes saat hujan deras minggu lalu.', 'selesai'),
(6, 6, 'AC Kurang Dingin', 'AC nyala tapi udaranya tidak dingin walau sudah suhu 16 derajat.', 'dilaporkan'),
(7, 7, 'Koneksi WiFi Putus-putus', 'Sinyal WiFi sering hilang di dalam kamar.', 'diproses'),
(8, 8, 'Shower Macet', 'Shower di kamar mandi dalam airnya tidak mau keluar.', 'selesai'),
(9, 9, 'Kasur Berbunyi', 'Per kasur agak berisik saat ditiduri.', 'dilaporkan'),
(10, 10, 'Kunci Tertinggal', 'Sempat terkunci dari luar, butuh kunci cadangan.', 'selesai');