import express from "express";
import { deleteRecipes, getRecipes, updateRecipes, createRecipes } from "../controllers/recipe.controller.js";
import { protect } from "../middleware/auth.js";




const router = express.Router();

export default router;

router.post("/", protect, createRecipes)

router.delete("/:id", protect, deleteRecipes)

router.put("/:id", protect, updateRecipes);

router.get("/", protect, getRecipes);
