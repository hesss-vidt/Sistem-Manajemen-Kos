import db from "../config/database.js";

// GET Semua Kamar 
const getAllKamar = (req, res) => {
    const nomor_kamar = req.query.nomor_kamar || ''; 
    const tipe_kamar = req.query.tipe_kamar || '';
    const status_kamar = req.query.status_kamar || '';

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    
    let query = "SELECT * FROM kamar WHERE nomor_kamar LIKE ?";
    let queryParams = [`%${nomor}%`];

    if (status_kamar) {
        query += " AND status_kamar = ?";
        queryParams.push(status_kamar);
    }
    if (tipe_kamar) {
        query += " AND tipe_kamar = ?";
        queryParams.push(tipe_kamar);
    }
    
    query += " LIMIT ? OFFSET ?";
    queryParams.push(limit, offset);

    db.query(query, queryParams, (err, results) => {
        if (err) {
            return res.status(500).json({ status: "error", message: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ status: "fail", message: "Data tidak ditemukan. Kriteria pencarian Anda mungkin tidak sesuai" });
        }
        res.status(200).json({ status: "success", page: page, limit: limit, data: results });
    });
};

// GET Kamar Berdasarkan ID
const getKamarById = (req, res) => {
    const query = "SELECT * FROM kamar WHERE id = ?";

    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ status: "error", message: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ status: "fail", message: "Kamar tidak ditemukan" });
        }
        res.status(200).json({ status: "success", message: "Kamar ditemukan", data: results[0] });
    });
};

// POST Tambah Kamar Baru
const createKamar = (req, res) => {
    const { nomor_kamar, tipe_kamar, fasilitas, harga_per_bulan } = req.body;
    const query = "INSERT INTO kamar (nomor_kamar, tipe_kamar, fasilitas, harga_per_bulan) VALUES (?, ?, ?, ?)";
    
    if (!nomor_kamar || !tipe_kamar || !fasilitas || !harga_per_bulan ) {
        return res.status(400).json({status: "fail", message: "Data yang dimasukkan tidak lengkap!"})
    }
    db.query(query, [nomor_kamar, tipe_kamar, fasilitas, harga_per_bulan || 'tersedia'], (err, result) => {
        if (err) {
            return res.status(500).json({ status: "error", message: err.message }); 
        }
        res.status(201).json({ status: "success", message: "Kamar berhasil ditambahkan", id: result.insertId });
    });
};

// PUT Update Data Kamar
const updateKamar = (req, res) => {
    const { status_kamar } = req.body;
    const query = "UPDATE kamar SET status_kamar = ? WHERE id = ?";

    if (!status_kamar) {
        return res.status(400).json({ status: "fail", message: " Status Kamar wajib diisi." });
    }
    
    db.query(query, [ status_kamar, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ status: "error", message: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: "fail", message: "Data Kamar tidak ditemukan " });
        }
        res.status(200).json({ status: "success", message: "Data kamar berhasil diperbarui" });
    });
};

// DELETE Hapus Kamar
const deleteKamar = (req, res) => {
    const query = "DELETE FROM kamar WHERE id = ?";
    
    db.query(query, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ status: "error", message: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: "fail", message: "Kamar tidak ditemukan" });
        }
        res.status(200).json({ status: "success", message: "Kamar berhasil dihapus" });
    });
};

export { getAllKamar, getKamarById, createKamar, updateKamar, deleteKamar };