import express from "express";
import { getAllKontrak, getKontrakById, createKontrak, updateKontrak, deleteKontrak } from "../controllers/kontrakController.js";

const router = express.Router();

router.get("/", getAllKontrak);
router.get("/:id", getKontrakById);
router.post("/", createKontrak);
router.put("/:id", updateKontrak);
router.delete("/:id", deleteKontrak);

export default router;