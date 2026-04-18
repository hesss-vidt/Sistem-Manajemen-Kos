import db from '../config/database.js';

const getAllPengguna = (req, res) => {
    const query = "SELECT * FROM pengguna";
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ status: "error", message: err.message });
        } else {
            res.status(200).json({ status: "success", data: results });
        }
    });
};

const getPenggunaById = (req, res) => {
    const query = "SELECT id, username, role, created_at FROM pengguna WHERE id = ?";
    db.query(query, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ status: "error", message: err.message });
        if (results.length === 0) return res.status(404).json({ status: "fail", message: "Pengguna tidak ditemukan" });
        res.status(200).json({ status: "success", data: results[0] });
    });
};

// POST Tambah Pengguna Baru
const createPengguna = (req, res) => {
    const { username, password, role } = req.body;
    const query = "INSERT INTO pengguna (username, password, role) VALUES (?, ?, ?)";
    
    db.query(query, [username, password, role || 'penyewa'], (err, result) => {
        if (err) return res.status(500).json({ status: "error", message: err.message });
        res.status(201).json({ status: "success", message: "Pengguna berhasil ditambahkan", id: result.insertId });
    });
};

// PUT Update Pengguna
const updatePengguna = (req, res) => {
    const { username, password, role } = req.body;
    const query = "UPDATE pengguna SET username = ?, password = ?, role = ? WHERE id = ?";
    
    db.query(query, [username, password, role, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ status: "error", message: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ status: "fail", message: "Pengguna tidak ditemukan" });
        res.status(200).json({ status: "success", message: "Data pengguna berhasil diperbarui" });
    });
};

// DELETE Hapus Pengguna
const deletePengguna = (req, res) => {
    const query = "DELETE FROM pengguna WHERE id = ?";
    db.query(query, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ status: "error", message: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ status: "fail", message: "Pengguna tidak ditemukan" });
        res.status(200).json({ status: "success", message: "Pengguna berhasil dihapus" });
    });
};
    
export {getAllPengguna, getPenggunaById, createPengguna, updatePengguna,deletePengguna};