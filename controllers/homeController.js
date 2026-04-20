import db from "../config/database.js";

const getHome = (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Selamat Datang di API Sistem Manajemen Kos",
        version: "1.0.0",
        author: "Napoleon Armee",
        endpoints: {
            pengguna: '/pengguna',
            kamar: '/kamar',
            penyewa: '/penyewa',
            kontrak: '/kontrak',
            pembayaran: '/pembayaran',
            keluhan : '/keluhan'
        }
    });
};

export { getHome };