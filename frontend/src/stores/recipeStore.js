import { create } from "zustand";

export const useRecipeStore = create((set) => ({
    recipes: [],
    favorites: [],
    addRecipe: (recipe) =>
        set((state) => ({
            recipes: [...state.recipes, { ...recipe, id: Date.now() }],
        })),
    removeRecipe: (id) =>
        set((state) => ({
            recipes: state.recipes.filter((recipe) => recipe.id !== id),
            favorites: state.favorites.filter((favorite) => favorite.id !== id),
        })),
    toggleFavorites: (recipe) =>
        set((state) => {
            const exists = state.favorites.find((fav) => fav.id === recipe.id);
            return {
                favorites: exists
                    ? state.favorites.filter((favorite) => favorite.id !== recipe.id)
                    : [...state.favorites, recipe],
            };
        }),
}));
