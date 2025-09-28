import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/db.js';
import Recipe from './models/recipe.model.js';
import { data } from 'react-router';
import mongoose from 'mongoose';

dotenv.config();
const app = express();

app.use(express.json()); //Note: This allows us to accept JSON data in the req.body

app.post("/api/recipes", async (req, res) => {
    const recipe = req.body; // Note: User will send this data
    if (!recipe.title || !recipe.category || !recipe.difficultyLevel || !recipe.servings || !recipe.prepTime || !recipe.cookTime || !recipe.ingredients) {
        return res.status(400).json({ success: false, message: "Please provide the required fields" });
    }

    const newRecipe = new Recipe(recipe);

    try {
        await newRecipe.save();
        res.status(201).json({ success: true, data: newRecipe });
    } catch (error) {
        console.error("Error in Create recipe: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
})

app.delete("/api/recipes/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await Recipe.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Recipe Deleted" });
    } catch (error) {
        res.status(404).json({ success: false, message: "Recipe not found" })
    }
})

app.put("/api/recipes/:id", async (req, res) => {
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
})



app.listen(5000, () => {
    connectDB();
    console.log('server started at http://localhost:5000');
});

// t5YVbDILio6o890D
// sungginkim528_db_user
// mongodb + srv://sungginkim528_db_user:t5YVbDILio6o890D@cluster0.vddnhgn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
