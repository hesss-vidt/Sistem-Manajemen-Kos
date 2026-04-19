import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import penggunaRoutes from "./routes/penggunaRoutes.js";
import kamarRoutes from "./routes/kamarRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); 

// 2. Mounting Routes (Pasangkan dengan awalan URL)
app.use("/pengguna", penggunaRoutes);
app.use("/kamar", kamarRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server berhasil jalan di port http://localhost:${PORT}`);
});