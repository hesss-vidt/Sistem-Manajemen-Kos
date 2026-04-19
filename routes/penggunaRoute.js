import express from "express";
import { getAllPengguna, getPenggunaById, createPengguna, updatePengguna, deletePengguna } from "../controllers/penggunaController.js";

const router = express.Router();

router.get("/", getAllPengguna);
router.get("/:id", getPenggunaById);
router.post("/", createPengguna);
router.put("/:id", updatePengguna);
router.delete("/:id", deletePengguna);

export default router;