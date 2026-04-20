import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import penggunaRoute from "./routes/penggunaRoute.js";
import kamarRoute from "./routes/kamarRoute.js";
import penyewaRoute from "./routes/penyewaRoute.js";
import kontrakRoute from "./routes/kontrakRoute.js";
import pembayaranRoute from "./routes/pembayaranRoute.js";
import keluhanRoute from './routes/keluhanRoute.js';
import homeRoute from "./routes/homeRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); 

// 2. Mounting Routes (Pasangkan dengan awalan URL)
app.use("/", homeRoute);
app.use("/pengguna", penggunaRoute);
app.use("/kamar", kamarRoute);
app.use("/penyewa", penyewaRoute);
app.use("/kontrak", kontrakRoute);
app.use("/pembayaran", pembayaranRoute);
app.use('/keluhan', keluhanRoute);

app.get('/', (req, res) => {
    res.send("Selamat Datang di API Manajemen Kos!");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server berhasil jalan di port http://localhost:${PORT}`);
});