
import { create } from "zustand";

export const useRecipeStore = create((set) => ({
    recipes: [],
    addRecipe: (recipe) =>
        set((state) => ({
            recipes: [...state.recipes, { ...recipe, id: Date.now() }],
        })),
    removeRecipe: (id) =>
        set((state) => ({
            recipes: state.recipes.filter((recipe) => recipe.id !== index),
        })),

    // Ill add updateRecipe later

    clearRecipes: () => set({ recipes: [] }),
}));
