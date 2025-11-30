import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        recipeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Recipe",
            required: true
        }
    },
    { timestamps: true }
);

export default mongoose.model("Favorite", FavoriteSchema);
