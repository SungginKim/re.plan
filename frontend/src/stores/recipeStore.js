import { create } from "zustand";
import { getRecipes, createRecipe, deleteRecipe, updatedRecipe } from "@/api";

export const useRecipeStore = create((set) => ({
    recipes: [],
    favorites: [],

    loadRecipe: async () => {
        try {
            const data = await getRecipes();
            set({ recipes: data });
        } catch (error) {
            console.error("Failed to load recipes:", error.message);
        }
    },

    addRecipe: async (recipe) => {
        try {
            const cleaned = {
                ...recipe,
                _id: undefined,
                ingredients: recipe.ingredients.map((i) => ({
                    name: i.name,
                    qty: i.qty
                })),
            };
            const saved = await createRecipe(cleaned);
            set((state) => ({
                recipes: [...state.recipes, saved],
            }));
        } catch (error) {
            console.error("Failed to add recipe:", error.message);
            throw error;
        }
    },

    removeRecipe: async (id) => {
        try {
            await deleteRecipe(id);
            set((state) => ({
                recipes: state.recipes.filter((recipe) => recipe._id !== id),
                favorites: state.favorites.filter((fav) => fav._id !== id),
            }));
        } catch (error) {
            console.error("Failed to delete recipe:", error.message);
        }
    },

    editRecipe: async (id, updatedData) => {
        try {
            const updated = await updatedRecipe(id, updatedData);
            set((state) => ({
                recipes: state.recipes.map((recipe) =>
                    recipe._id === id ? updated : recipe
                ),
            }));
        } catch (error) {
            console.error("Failed to edit recipe:", error.message);
        }
    },

    toggleFavorites: (recipe) =>
        set((state) => {
            const exists = state.favorites.find((fav) => fav._id === recipe._id);
            return {
                favorites: exists
                    ? state.favorites.filter((fav) => fav._id !== recipe._id)
                    : [...state.favorites, recipe],
            };
        }),
}));
