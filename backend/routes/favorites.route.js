import express from "express";
import { protect } from "../middleware/auth.js";
import Favorite from "../models/favorites.model.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {
    const favorites = await Favorite.find({ user: req.user._id }).populate("recipeId");
    res.status(200).json(favorites.map(fav => fav.recipeId));
});

router.post("/", protect, async (req, res) => {
    const { recipeId } = req.body;
    const favorite = await Favorite.create({ user: req.user._id, recipeId });
    await favorite.populate("recipeId");
    res.status(201).json({ favorite: favorite.recipeId });
});

router.delete("/:id", protect, async (req, res) => {
    await Favorite.findOneAndDelete({ user: req.user._id, recipeId: req.params.id });
    res.status(200).json({ message: "Removed" });
});

export default router;
