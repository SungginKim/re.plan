import React from "react";
import bg from "@/assets/images/bg.png";
import { useRecipeStore } from "@/stores/recipeStore";

import RecipeCard from "@/components/RecipeCard";
import CreateRecipeButton from "@/components/CreateRecipeButton";
import { useOutletContext } from "react-router";

const user = { name: "Sunggin Kim" };

const HomePage = () => {
  const { category } = useOutletContext();
  const recipes = useRecipeStore((state) => state.recipes);
  // const filtered = category ? recipes.filter((r)=> r.category === category.toLowerCase())
  return (
    <div className="bg-[#F5F6FA] w-full min-h-screen md:p-8 p-3 relative">
      <div className="w-full flex flex-col flex-1 gap-2">
        <h1 className="lg:text-3xl md:text-2xl text-lg font-semibold font-nunito">{`Welcome, ${user.name}!`}</h1>
        <div className="relative">
          <img
            className="w-full object-cover md:rounded-lg rounded-md"
            src={bg}
            alt="background image"
          />
          <div className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 flex flex-col lg:gap-5 md:gap-3">
            <h2 className="lg:text-5xl md:text-4xl sm:text-3xl font-bold text-white">
              Re.plan your <br /> kitchen routine
            </h2>
            <h3 className="lg:text-xl md:text-lg sm:text-sm text-[10px] text-white">
              Keep all your favorite recipes in one place
            </h3>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
