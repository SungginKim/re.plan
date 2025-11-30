import Recipe from "../models/recipe.model.js";
import mongoose from "mongoose";

export const createRecipes = async (req, res) => {
    console.log("Received body:", req.body);
    const recipe = req.body;

    if (!req.user) {
        return res.status(401).json({ success: false, message: "Not authorized" });
    }

    if (!recipe.title) {
        return res.status(400).json({ success: false, message: "Please provide the required fields" });
    }

    const newRecipe = new Recipe({ ...recipe, userId: req.user._id });

    try {
        await newRecipe.save();
        res.status(201).json({ success: true, data: newRecipe });
    } catch (error) {
        console.error("Error in Create recipe: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}


export const deleteRecipes = async (req, res) => {
    const { id } = req.params;
    try {
        await Recipe.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Recipe Deleted" });
    } catch (error) {
        res.status(404).json({ success: false, message: "Recipe not found" })
    }
}

export const updateRecipes = async (req, res) => {
    const { id } = req.params;
    const recipe = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(id, recipe, { new: true });
        res.status(200).json({ success: true, data: updatedRecipe })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({ userId: req.user._id });
        res.status(200).json({ success: true, data: recipes });

    } catch (error) {
        console.log("Erroe in fetching products: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}