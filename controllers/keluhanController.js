import db from "../config/database.js";

// 1. GET Semua Keluhan 
const getAllKeluhan = (req, res) => {
    const status_penanganan = req.query.status_penanganan || '';
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    let query = `
        SELECT keluhan.*, penyewa.nama_lengkap, kamar.nomor_kamar 
        FROM keluhan
        JOIN penyewa ON keluhan.id_penyewa = penyewa.id
        JOIN kamar ON keluhan.id_kamar = kamar.id
        WHERE 1=1
    `;
    
    let queryParams = [];

    if (status_penanganan) {
        query += " AND keluhan.status_penanganan = ?";
        queryParams.push(status_penanganan);
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

// 2. GET Keluhan Berdasarkan ID
const getKeluhanById = (req, res) => {
    const query = `
        SELECT keluhan.*, penyewa.nama_lengkap, kamar.nomor_kamar 
        FROM keluhan
        JOIN penyewa ON keluhan.id_penyewa = penyewa.id
        JOIN kamar ON keluhan.id_kamar = kamar.id
        WHERE keluhan.id = ?
    `;

    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ status: "error", message: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ status: "fail", message: "Data keluhan tidak ditemukan" });
        }
        res.status(200).json({ status: "success", data: results[0] });
    });
};

// 3. POST Tambah Keluhan Baru
const createKeluhan = (req, res) => {
    const { id_penyewa, id_kamar, judul_laporan, deskripsi } = req.body;
    const query = "INSERT INTO keluhan (id_penyewa, id_kamar, judul_laporan, deskripsi) VALUES (?, ?, ?, ?)";
    
    if (!id_penyewa || !id_kamar || !judul_laporan || !deskripsi) { 
        return res.status(400).json({ status: "fail", message: "Data yang dimasukkan tidak lengkap!" });
    }

    db.query(query, [id_penyewa, id_kamar, judul_laporan, deskripsi], (err, result) => {
        if (err) {
            return res.status(500).json({ status: "error", message: err.message });
        }
        res.status(201).json({ status: "success", message: "Keluhan berhasil dikirim, mohon tunggu tindak lanjut" });
    });
};

// 4. PUT Update Status/Tanggapan Keluhan
const updateKeluhan = (req, res) => {
    const { status_penanganan} = req.body;
    const query = "UPDATE keluhan SET status_penanganan = ? WHERE id = ?";
    
    if (!status_penanganan) {
        return res.status(400).json({ status: "fail", message: "Status Penanganan wajib diisi." });
    }

    db.query(query, [status_penanganan, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ status: "error", message: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: "fail", message: "Data keluhan tidak ditemukan" });
        }
        res.status(200).json({ status: "success", message: "Status keluhan berhasil diperbarui" });
    });
};

// 5. DELETE Hapus Keluhan
const deleteKeluhan = (req, res) => {
    const query = "DELETE FROM keluhan WHERE id = ?";
    db.query(query, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ status: "error", message: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: "fail", message: "Data keluhan tidak ditemukan" });
        }
        res.status(200).json({ status: "success", message: "Catatan keluhan berhasil dihapus" });
    });
};

export { getAllKeluhan, getKeluhanById, createKeluhan, updateKeluhan, deleteKeluhan };