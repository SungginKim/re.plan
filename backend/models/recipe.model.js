import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category:{
        type: String,
        enum: ["Appetizer", "Main", "Side", "Dessert"],
        required: true
    },
    difficultyLevel: {
        type: String,
        enum: ['Easy', 'Moderate', 'Difficult'],
        required: true
    },
    servings: {
        type: Number,
        required: true
    },
    prepTime: {
        type: Number,
        required: true
    },
    cookTime: {
        type: Number,
        required: true
    },
    instructions: [{
        type: String,
    }],
    ingredients: [
        {
            name: {
                type: String,
                required: true
            },
            measurement: {
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