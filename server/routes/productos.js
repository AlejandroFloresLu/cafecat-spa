import { Router } from "express";
import { listarProductos, detalleProducto, crearProducto } from "../controllers/productos.controller.js";
const router = Router();
router.get("/", listarProductos);
router.get("/:id", detalleProducto);
router.post("/", crearProducto);
export default router;