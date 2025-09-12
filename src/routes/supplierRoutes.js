import express from "express";
import { SupplierController } from "../controllers/supplierController.js";

const router = express.Router();

router.get("/", SupplierController.getAll);
router.get("/:id", SupplierController.getById);
router.post("/", SupplierController.create);
router.put("/:id", SupplierController.update);
router.delete("/:id", SupplierController.remove);

export default router;
