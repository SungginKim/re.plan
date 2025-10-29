import express from "express";
import Recipe from '../models/recipe.model.js';
import { data } from 'react-router';
import mongoose from 'mongoose';
import { deleteRecipes, getRecipes, updateRecipes, createRecipes } from "../controllers/recipe.controller.js";



const router = express.Router();

export default router;

router.post("/", createRecipes)

router.delete("/:id", deleteRecipes)

router.put("/:id", updateRecipes);

router.get("/", getRecipes);
