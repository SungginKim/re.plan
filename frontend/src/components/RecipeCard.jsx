import React, { useState } from "react";
import { CookingPot } from "lucide-react";
import { ChartNoAxesColumnIncreasing } from "lucide-react";
import { Timer } from "lucide-react";
import { Bookmark } from "lucide-react";
import { Soup } from "lucide-react";
import { useRecipeStore } from "@/stores/recipeStore";

const RecipeCard = ({ recipe }) => {
  const favorites = useRecipeStore((state) => state.favorites);
  const toggleFavorites = useRecipeStore((state) => state.toggleFavorites); 
  const saved = favorites.some((fav) => fav.id === recipe.id);
  const [save, setSave] = useState(false);
  const handleSave = () => {
    toggleFavorites(recipe);
    setSave(!save)
  }

  return (
    <div className="h-[170px] bg-white rounded-xl flex flex-col justify-between p-3">
      <div className="flex flex-col gap-2">
        <div className="flex flex-1 justify-between">
          <div className="size-[67px] bg-[#FFDED1] rounded-3xl flex justify-center items-center">
            {<Soup color="#FF7518" className="w-[60%] h-[60%]" />}
          </div>
          <button
            onClick={handleSave}
            className={`${!saved ? "bg-white" : "bg-orange-custom"} w-[30px] h-[30px] rounded-full flex justify-center items-center cursor-pointer`}
          >
            {!saved ? (
              <Bookmark color="none" fill="gray" className="size-5" />
            ) : (
              <Bookmark color="none" fill="white" className="size-5" />
            )}
          </button>
        </div>
        <p className="text-[20px] font-bold font-nunito truncate w-full">
          {recipe.title}
        </p>
      </div>
      <div className="flex gap-5 text-[10px] text-gray-500 font-semibold h-fit w-fit">
        <p className="flex ">
          {<CookingPot className="size-[13px]" />}
          {recipe.category}
        </p>
        <p className="flex">
          {<ChartNoAxesColumnIncreasing className="size-[13px]" />}
          {recipe.prepTime}
        </p>
        <p className="flex">
          {<Timer className="size-[13px]" />}
          {recipe.cookingTime}
        </p>
      </div>
    </div>
  );
};

export default RecipeCard;
