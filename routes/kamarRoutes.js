import express from "express";
const router = express.Router();
import { getAllKamar, getKamarById, createKamar, updateKamar, deleteKamar } from "../controllers/kamarControllers.js";

router.get("/", getAllKamar);
router.get("/:id", getKamarById);
router.post("/", createKamar);
router.put("/:id", updateKamar);
router.delete("/:id", deleteKamar);

export default router;