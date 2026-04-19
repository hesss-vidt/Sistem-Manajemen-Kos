import express from "express";
import { getAllPenyewa, getPenyewaById, createPenyewa, updatePenyewa, deletePenyewa } from "../controllers/penyewaController.js";

const router = express.Router();

router.get("/", getAllPenyewa);
router.get("/:id", getPenyewaById);
router.post("/", createPenyewa);
router.put("/:id", updatePenyewa);
router.delete("/:id", deletePenyewa);

export default router;