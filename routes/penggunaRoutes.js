import express from "express";
const router = express.Router();

import { 
    getAllPengguna, 
    getPenggunaById, 
    createPengguna, 
    updatePengguna, 
    deletePengguna 
} from "../controllers/penggunaControllers.js";


router.get("/", getAllPengguna);
router.get("/:id", getPenggunaById);
router.post("/", createPengguna);
router.put("/:id", updatePengguna);
router.delete("/:id", deletePengguna);

export default router;