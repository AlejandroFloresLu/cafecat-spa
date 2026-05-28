import { Router } from "express";
import { listarUsuarios, crearUsuario } from "../controllers/usuarios.controller.js";
const router = Router();
router.get("/", listarUsuarios);
router.post("/", crearUsuario);
export default router;