import db from "../config/database.js";

// 1. GET Semua Pembayaran (Triple JOIN: Pembayaran -> Kontrak -> Penyewa & Kamar)
const getAllPembayaran = (req, res) => {
    const status = req.query.status_pembayaran || '';
    const metode = req.query.metode_pembayaran || '';
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    let query = `
        SELECT pembayaran.*, penyewa.nama_lengkap, kamar.nomor_kamar 
        FROM pembayaran
        JOIN kontrak ON pembayaran.id_kontrak = kontrak.id
        JOIN penyewa ON kontrak.id_penyewa = penyewa.id
        JOIN kamar ON kontrak.id_kamar = kamar.id
        WHERE 1=1
    `;
    
    let queryParams = [];

    if (status) {
        query += " AND pembayaran.status_pembayaran = ?";
        queryParams.push(status);
    }

    if (metode) {
        query += " AND pembayaran.metode_pembayaran = ?";
        queryParams.push(metode);
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

// 2. GET Pembayaran Berdasarkan ID
const getPembayaranById = (req, res) => {
    const query = `
        SELECT pembayaran.*, penyewa.nama_lengkap, kamar.nomor_kamar 
        FROM pembayaran
        JOIN kontrak ON pembayaran.id_kontrak = kontrak.id
        JOIN penyewa ON kontrak.id_penyewa = penyewa.id
        JOIN kamar ON kontrak.id_kamar = kamar.id
        WHERE pembayaran.id = ?
    `;

    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ status: "error", message: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ status: "fail", message: "Data pembayaran tidak ditemukan" });
        }
        res.status(200).json({ status: "success", data: results[0] });
    });
};

// 3. POST Tambah Pembayaran Baru
const createPembayaran = (req, res) => {
    const { id_kontrak, tanggal_pembayaran, jumlah_pembayaran, metode_pembayaran, status_pembayaran } = req.body;
    const query = "INSERT INTO pembayaran (id_kontrak, tanggal_pembayaran, jumlah_pembayaran, metode_pembayaran, status_pembayaran) VALUES (?, ?, ?, ?, ?)";
    
    db.query(query, [id_kontrak, tanggal_pembayaran, jumlah_pembayaran, metode_pembayaran, status_pembayaran || 'pending'], (err, result) => {
        if (err) {
            return res.status(500).json({ status: "error", message: err.message });
        }
        res.status(201).json({ status: "success", message: "Data pembayaran berhasil dicatat" });
    });
};

// 4. PUT Update Status/Data Pembayaran
const updatePembayaran = (req, res) => {
    const { jumlah_pembayaran, metode_pembayaran, status_pembayaran } = req.body;
    const query = "UPDATE pembayaran SET jumlah_pembayaran = ?, metode_pembayaran = ?, status_pembayaran = ? WHERE id = ?";
    
    db.query(query, [status_pembayaran, metode_pembayaran, jumlah_pembayaran, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ status: "error", message: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: "fail", message: "Data pembayaran tidak ditemukan" });
        }
        res.status(200).json({ status: "success", message: "Data pembayaran berhasil diperbarui" });
    });
};

// 5. DELETE Hapus Pembayaran
const deletePembayaran = (req, res) => {
    const query = "DELETE FROM pembayaran WHERE id = ?";

    db.query(query, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ status: "error", message: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: "fail", message: "Data pembayaran tidak ditemukan" });
        }
        res.status(200).json({ status: "success", message: "Data pembayaran berhasil dihapus" });
    });
};

export { getAllPembayaran, getPembayaranById, createPembayaran, updatePembayaran, deletePembayaran };