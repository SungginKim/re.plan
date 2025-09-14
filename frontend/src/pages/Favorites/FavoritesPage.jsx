import React from "react";
import { Plus } from "lucide-react";
import RecipeCard from "@/components/RecipeCard";
import { useRecipeStore } from "@/stores/recipeStore";


const FavoritesPage = () => {
  const favorites = useRecipeStore((state) => state.favorites)
  return (
    <div className="bg-[#F5F6FA] w-full min-h-screen md:p-8 p-3 relative">
      <h1 className="lg:text-3xl md:text-2xl text-lg font-semibold font-nunito">
        Saved Recipes
      </h1>
      <hr />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-4">
        {favorites.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
