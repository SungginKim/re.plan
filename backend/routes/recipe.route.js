import express from "express";
import { deleteRecipes, getRecipes, updateRecipes, createRecipes } from "../controllers/recipe.controller.js";



const router = express.Router();

export default router;

router.post("/", createRecipes)

router.delete("/:id", deleteRecipes)

router.put("/:id", updateRecipes);

router.get("/", getRecipes);
