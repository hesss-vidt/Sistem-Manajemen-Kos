import express from "express";
import { getAllKeluhan, getKeluhanById, createKeluhan, updateKeluhan, deleteKeluhan } from "../controllers/keluhanController.js";

const router = express.Router();

router.get("/", getAllKeluhan);
router.get("/:id", getKeluhanById);
router.post("/", createKeluhan);
router.put("/:id", updateKeluhan);
router.delete("/:id", deleteKeluhan);

export default router;