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
                type: String
            }
        }
    ]
},
    {
        timestamps: true //Note for self --> createdAt, updatedAt
    }
);

const Recipe = mongoose.model('Recipe', recipeSchema);
export default Recipe;