import React, { useState } from "react";
import {
  CookingPot,
  ChartNoAxesColumnIncreasing,
  Timer,
  Bookmark,
  SquarePen,
  Soup,
  Trash,
} from "lucide-react";
import { useRecipeStore } from "@/stores/recipeStore";
import { Link, useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe, onDeleteRequest, isSaved }) => {
  const toggleFavorites = useRecipeStore((state) => state.toggleFavorites);
  const [save, setSave] = useState(isSaved);
  const navigate = useNavigate();

  const handleSave = () => {
    toggleFavorites(recipe);
    setSave(!save);
  };

  return (
    <div className="h-[170px] bg-white rounded-xl flex flex-col justify-between p-3 cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all ">
      <div className="flex flex-col gap-2">
        <div className="flex flex-1 justify-between">
          <div className="size-[67px] bg-[#FFDED1] rounded-3xl flex justify-center items-center">
            <Soup color="#FF7518" className="w-[60%] h-[60%]" />
          </div>
          <div className="flex align-items justify-center h-fit gap-2">
            <button
              onClick={() => onDeleteRequest(recipe._id)}
              className="cursor-pointer"
            >
              <Trash className="size-4 hover:stroke-red-700" stroke="gray" />
            </button>
            <button
              onClick={handleSave}
              className={`${save ? "bg-orange-custom" : "bg-white"} w-[25px] h-[25px] rounded-full flex justify-center items-center cursor-pointer`}
            >
              <Bookmark
                color="none"
                fill={save ? "white" : "gray"}
                className="size-4"
              />
            </button>
            <button onClick={() => navigate(`/recipe/${recipe._id}/edit`)}>
              <SquarePen
                stroke="gray"
                className="size-4 hover:stroke-orange-600 cursor-pointer"
              />
            </button>
          </div>
        </div>
        <Link to={`/recipe/${recipe._id}`}>
          <p className="text-[20px] font-bold font-nunito truncate w-full">
            {recipe.title}
          </p>
        </Link>
      </div>
      <Link to={`/recipe/${recipe._id}`}>
        <div className="flex gap-5 text-[10px] text-gray-500 font-semibold h-fit w-fit">
          <p className="flex">
            <CookingPot className="size-[13px]" />
            {recipe.category}
          </p>
          <p className="flex">
            <ChartNoAxesColumnIncreasing className="size-[13px]" />
            {recipe.difficultyLevel}
          </p>
          <p className="flex">
            <Timer className="size-[13px]" />
            {recipe.cookTime}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
