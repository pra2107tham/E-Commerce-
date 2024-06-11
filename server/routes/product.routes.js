import { Router } from "express";
const router = Router();

import { createProduct, getProducts, deleteProduct, updateProduct } from "../controllers/product.controller.js";

router.get("/", getProducts);
router.post("/createProduct", createProduct);
router.delete("/deleteProduct/:id", deleteProduct);
router.put("/updateProduct/:id", updateProduct);

export default router;