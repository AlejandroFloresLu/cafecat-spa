import { Router } from "express";
import { crearPedido, listarPedidos } from "../controllers/pedidos.controller.js";
const router = Router();
router.get("/", listarPedidos);
router.post("/", crearPedido);
export default router;