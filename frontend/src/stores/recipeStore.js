import { create } from "zustand";
import { getRecipes, createRecipe, deleteRecipe, updatedRecipe } from "@/api";

export const useRecipeStore = create((set, get) => ({
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
                recipes: state.recipes.filter((recipe) => recipe?._id !== id),
                favorites: state.favorites.filter((fav) => fav?._id !== id),
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

    loadFavorites: async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:5000/api/favorites", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed to fetch favorites");
            const data = await res.json();
            set({ favorites: data });
        } catch (error) {
            console.error("Failed to load favorites:", error.message);
        }
    },

    toggleFavorites: async (recipe) => {
        if (!recipe?._id) return;

        const token = localStorage.getItem("token");
        const favorites = get().favorites || [];
        const exists = favorites.find((fav) => fav?._id === recipe._id);

        try {
            if (exists) {
                const res = await fetch(
                    `http://localhost:5000/api/favorites/${recipe._id}`,
                    {
                        method: "DELETE",
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                if (!res.ok) throw new Error("Failed to remove favorite");

                set((state) => ({
                    favorites: state.favorites.filter(
                        (fav) => fav?._id !== recipe._id
                    ),
                }));
            } else {
                const res = await fetch("http://localhost:5000/api/favorites", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ recipeId: recipe._id }),
                });
                if (!res.ok) throw new Error("Failed to add favorite");

                const data = await res.json();
                set((state) => ({
                    favorites: [...state.favorites, data.favorite],
                }));
            }
        } catch (err) {
            console.error("Error toggling favorite:", err);
        }
    }

}));

