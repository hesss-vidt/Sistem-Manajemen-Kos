import db from "../config/database.js";

const getAllPenyewa = (req, res) => {

    const nama = req.query.nama || '';
    const gender = req.query.jenis_kelamin || '';
    const pekerjaan = req.query.pekerjaan || '';
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    let query = `
        SELECT penyewa.*, pengguna.username 
        FROM penyewa 
        JOIN pengguna ON penyewa.id_pengguna = pengguna.id 
        WHERE penyewa.nama_lengkap LIKE ?
    `;
    let queryParams = [`%${nama}%`];

    if (gender) {
        query += " AND jenis_kelamin = ?";
        queryParams.push(gender);
    }

    if (pekerjaan) {
        query += " AND penyewa.pekerjaan = ?";
        queryParams.push(pekerjaan);
    }

    query += " LIMIT ? OFFSET ?";
    queryParams.push(limit, offset);

    db.query(query, queryParams, (err, results) => {
        if (err) {
            return res.status(500).json({ status: "error", message: err.message });
        }
        res.status(200).json({ status: "success", page: page, limit: limit, data: results });
    });
};

// GET Penyewa Berdasarkan ID
const getPenyewaById = (req, res) => {
    const query = `
        SELECT penyewa.*, pengguna.username 
        FROM penyewa 
        JOIN pengguna ON penyewa.id_pengguna = pengguna.id 
        WHERE penyewa.id = ?
    `;

    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ status: "error", message: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ status: "fail", message: "Penyewa tidak ditemukan" });
        }
        res.status(200).json({ status: "success", message: "Biodata Penyewa ditemukan", data: results[0] });
    });
};

// POST Tambah Penyewa Baru 
const createPenyewa = (req, res) => {
    const { id_pengguna, nama_lengkap, jenis_kelamin, pekerjaan, asal_kota, no_hp } = req.body;
    const query = "INSERT INTO penyewa (id_pengguna, nama_lengkap, jenis_kelamin, pekerjaan, asal_kota, no_hp) VALUES (?, ?, ?, ?, ?, ?)";
    
    db.query(query, [id_pengguna, nama_lengkap, jenis_kelamin, pekerjaan, asal_kota, no_hp], (err, result) => {
        if (err) {
            return res.status(500).json({ status: "error", message: err.message });
        }
        res.status(201).json({ status: "success", message: "Biodata penyewa berhasil ditambahkan" });
    });
};

// PUT Update Data Penyewa
const updatePenyewa = (req, res) => {
    const { nama_lengkap, jenis_kelamin, pekerjaan, asal_kota, no_hp } = req.body;
    const query = "UPDATE penyewa SET nama_lengkap = ?, jenis_kelamin = ?, pekerjaan = ?, asal_kota = ?, no_hp = ? WHERE id = ?";
    
    db.query(query, [nama_lengkap, jenis_kelamin, pekerjaan, asal_kota, no_hp, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ status: "error", message: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: "fail", message: "Data penyewa tidak ditemukan" });
        }
        res.status(200).json({ status: "success", message: "Biodata penyewa berhasil diperbarui" });
    });
};

// DELETE Hapus Penyewa
const deletePenyewa = (req, res) => {
    const query = "DELETE FROM penyewa WHERE id = ?";
    
    db.query(query, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ status: "error", message: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: "fail", message: "Data penyewa tidak ditemukan" });
        }
        res.status(200).json({ status: "success", message: "Data penyewa berhasil dihapus" });
    });
};

export { getAllPenyewa, getPenyewaById, createPenyewa, updatePenyewa, deletePenyewa };