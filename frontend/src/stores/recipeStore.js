import { create } from "zustand";
import { getRecipes, createRecipe, deleteRecipe } from "@/api"

export const useRecipeStore = create((set) => ({
    recipes: [],
    favorites: [],

    loadRecipe: async () => {
        const data = await getRecipes();
        set({ recipes: data });
    },
    addRecipe: async (recipe) => {
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
    },
    removeRecipe: async (id) => {
        await deleteRecipe(id);
        set((state) => ({
            recipes: state.recipes.filter((recipe) => recipe._id !== id),
            favorites: state.favorites.filter((favorite) => favorite._id !== id),
        }))
    },
    toggleFavorites: (recipe) =>
        set((state) => {
            const exists = state.favorites.find((fav) => fav._id === recipe._id);
            return {
                favorites: exists
                    ? state.favorites.filter((favorite) => favorite._id !== recipe._id)
                    : [...state.favorites, recipe],
            };
        }),
}));
