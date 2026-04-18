import db from "../config/database.js";

// GET Semua Kamar (dengan Search dan Pagination)
export const getAllKamar = (req, res) => {
    // Pagination: Default halaman 1, limit 10 data per halaman
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    
    // Pencarian berdasarkan nomor kamar
    const search = req.query.q || '';

    const query = "SELECT * FROM kamar WHERE nomor_kamar LIKE ? LIMIT ? OFFSET ?";
    
    db.query(query, [`%${search}%`, limit, offset], (err, results) => {
        if (err) return res.status(500).json({ status: "error", message: err.message });
        res.status(200).json({ 
            status: "success", 
            page: page,
            limit: limit,
            data: results 
        });
    });
};

// GET Kamar Berdasarkan ID
export const getKamarById = (req, res) => {
    const query = "SELECT * FROM kamar WHERE id = ?";
    db.query(query, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ status: "error", message: err.message });
        if (results.length === 0) return res.status(404).json({ status: "fail", message: "Kamar tidak ditemukan" });
        res.status(200).json({ status: "success", data: results[0] });
    });
};

// POST Tambah Kamar Baru
export const createKamar = (req, res) => {
    const { nomor_kamar, tipe_kamar, harga_per_bulan, status } = req.body;
    const query = "INSERT INTO kamar (nomor_kamar, tipe_kamar, harga_per_bulan, status) VALUES (?, ?, ?, ?)";
    
    db.query(query, [nomor_kamar, tipe_kamar, harga_per_bulan, status || 'tersedia'], (err, result) => {
        if (err) return res.status(500).json({ status: "error", message: err.message });
        res.status(201).json({ status: "success", message: "Kamar berhasil ditambahkan", id: result.insertId });
    });
};

// PUT Update Data Kamar
export const updateKamar = (req, res) => {
    const { nomor_kamar, tipe_kamar, harga_per_bulan, status } = req.body;
    const query = "UPDATE kamar SET nomor_kamar = ?, tipe_kamar = ?, harga_per_bulan = ?, status = ? WHERE id = ?";
    
    db.query(query, [nomor_kamar, tipe_kamar, harga_per_bulan, status, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ status: "error", message: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ status: "fail", message: "Kamar tidak ditemukan" });
        res.status(200).json({ status: "success", message: "Data kamar berhasil diperbarui" });
    });
};

// DELETE Hapus Kamar
export const deleteKamar = (req, res) => {
    const query = "DELETE FROM kamar WHERE id = ?";
    db.query(query, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ status: "error", message: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ status: "fail", message: "Kamar tidak ditemukan" });
        res.status(200).json({ status: "success", message: "Kamar berhasil dihapus" });
    });
};