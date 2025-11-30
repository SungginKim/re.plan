import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["Appetizer", "Main", "Side", "Dessert"],
    },
    difficultyLevel: {
        type: String,
        enum: ["Easy", "Moderate", "Difficult"],
    },
    servings: {
        type: Number,
    },
    prepTime: {
        type: Number,
    },
    cookTime: {
        type: Number,
    },
    instructions: [{
        type: String,
    }],
    ingredients: [
        {
            name: {
                type: String,
            },
            qty: {
                type: String,
            }
        }
    ],
    notes: {
        type: String,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
},
    {
        timestamps: true
    }
);

const Recipe = mongoose.model('Recipe', recipeSchema);
export default Recipe;