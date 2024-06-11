import {Router} from "express";
import auth from "../middleware/auth.middleware.js";
import authAdmin from "../middleware/authAdmin.middleware.js";
const router = Router();

import { createCategory, getCategories, deleteCategory, updateCategory } from "../controllers/category.controller.js";

router.get("/", getCategories);
router.post("/createCategory", auth, authAdmin, createCategory);
router.delete("/deleteCategory/:id", auth, authAdmin, deleteCategory);
router.put("/updateCategory/:id", auth, authAdmin, updateCategory)

export default router;