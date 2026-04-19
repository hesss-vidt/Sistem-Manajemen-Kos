import express from "express";
import { getAllPembayaran, getPembayaranById, createPembayaran, updatePembayaran, deletePembayaran } from "../controllers/pembayaranController.js";

const router = express.Router();

router.get("/", getAllPembayaran);
router.get("/:id", getPembayaranById);
router.post("/", createPembayaran);
router.put("/:id", updatePembayaran);
router.delete("/:id", deletePembayaran);

export default router;