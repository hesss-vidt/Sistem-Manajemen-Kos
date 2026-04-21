import db from "../config/database.js";

// 1. GET Semua Kontrak 
const getAllKontrak = (req, res) => {
    const nomor_kamar = req.query.nomor_kamar || '';
    const nama_penyewa = req.query.nama_penyewa || '';
    const status_sewa = req.query.status_sewa || '';

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    let query = `
        SELECT kontrak.*, kamar.nomor_kamar, penyewa.nama_lengkap 
        FROM kontrak 
        JOIN kamar ON kontrak.id_kamar = kamar.id 
        JOIN penyewa ON kontrak.id_penyewa = penyewa.id 
        WHERE kamar.nomor_kamar LIKE ? AND penyewa.nama_lengkap LIKE ?
    `;
    let queryParams = [`%${nomor_kamar}%`, `%${nama_penyewa}%`];

    if (status_sewa) {
        query += " AND kontrak.status_sewa = ?";
        queryParams.push(status_sewa);
    }

    query += " ORDER BY kontrak.tanggal_masuk DESC LIMIT ? OFFSET ?";
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

// 2. GET Kontrak Berdasarkan ID 
const getKontrakById = (req, res) => {
    const query = `
        SELECT kontrak.*, kamar.nomor_kamar, penyewa.nama_lengkap 
        FROM kontrak 
        JOIN kamar ON kontrak.id_kamar = kamar.id 
        JOIN penyewa ON kontrak.id_penyewa = penyewa.id 
        WHERE kontrak.id = ?
    `;
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ status: "error", message: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ status: "fail", message: "Data kontrak tidak ditemukan" });
        }
        res.status(200).json({ status: "success", data: results[0] });
    });
};

// 3. POST Tambah Kontrak Baru
const createKontrak = (req, res) => {
    const { id_kamar, id_penyewa, tanggal_masuk, tanggal_berakhir, periode_sewa } = req.body;
    const query = "INSERT INTO kontrak (id_kamar, id_penyewa, tanggal_masuk, tanggal_berakhir, periode_sewa) VALUES (?, ?, ?, ?, ?)";

    if (!id_penyewa || !id_kamar || !tanggal_masuk || !tanggal_berakhir || !periode_sewa) {
        return res.status(400).json({ status: "fail", message: "Data yang dimasukkan tidak lengkap!" });
    }
    
    db.query(query, [id_kamar, id_penyewa, tanggal_masuk, tanggal_berakhir, periode_sewa], (err, result) => {
        if (err) {
            return res.status(500).json({ status: "error", message: err.message });
        }
        res.status(201).json({ status: "success", message: "Kontrak sewa berhasil ditambahkan" });
    });
};

// 4. PUT Update Data Kontrak
const updateKontrak = (req, res) => {
    const { status_sewa } = req.body;
    const query = "UPDATE kontrak SET status_sewa = ? WHERE id = ?";

    if (!status_sewa) {
        return res.status(400).json({ status: "fail", message: "Status Sewa wajib diisi." });
    }
    
    db.query(query, [ status_sewa, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ status: "error", message: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: "fail", message: "Data kontrak tidak ditemukan" });
        }
        res.status(200).json({ status: "success", message: "Data kontrak berhasil diperbarui" });
    });
};

// 5. DELETE Hapus Kontrak
const deleteKontrak = (req, res) => {
    const query = "DELETE FROM kontrak WHERE id = ?";

    db.query(query, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ status: "error", message: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: "fail", message: "Data kontrak tidak ditemukan" });
        }
        res.status(200).json({ status: "success", message: "Data kontrak berhasil dihapus" });
    });
};

export { getAllKontrak, getKontrakById, createKontrak, updateKontrak, deleteKontrak };