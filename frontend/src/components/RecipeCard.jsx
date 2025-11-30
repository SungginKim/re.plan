import React, { useState } from "react";
import { CookingPot } from "lucide-react";
import { ChartNoAxesColumnIncreasing } from "lucide-react";
import { Timer } from "lucide-react";
import { Bookmark, SquarePen } from "lucide-react";
import { Soup, Trash } from "lucide-react";
import { useRecipeStore } from "@/stores/recipeStore";
import Modal from "./Modal";
import { Link, useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  const favorites = useRecipeStore((state) => state.favorites);
  const toggleFavorites = useRecipeStore((state) => state.toggleFavorites);
  const removeRecipe = useRecipeStore((state) => state.removeRecipe);
  const saved = favorites.some((fav) => fav._id === recipe._id);
  const [save, setSave] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleSave = () => {
    toggleFavorites(recipe);
    setSave(!save);
  };

  const handleDelete = () => {
    removeRecipe(recipe._id);
    setOpenModal(false);
  };

  return (
    <div className="h-[170px] bg-white rounded-xl flex flex-col justify-between p-3 cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all ">
      <div className="flex flex-col gap-2">
        <div className="flex flex-1 justify-between">
          <div className="size-[67px] bg-[#FFDED1] rounded-3xl flex justify-center items-center">
            {<Soup color="#FF7518" className="w-[60%] h-[60%]" />}
          </div>
          <div className="flex align-items justify-center h-fit gap-2">
            <button
              className="cursor-pointer"
              onClick={() => setOpenModal(true)}
            >
              <Trash className="size-4 hover:stroke-red-700" stroke="gray" />
            </button>
            {openModal && (
              <Modal
                title="Are you Sure?"
                bodyText="This action cannot be undone. Are you sure you want to delete this recipe?"
                confirmText="Delete"
                handleDelete={handleDelete}
                handleCancel={setOpenModal}
              />
            )}
            <button
              onClick={handleSave}
              className={`${!saved ? "bg-white" : "bg-orange-custom"} w-[25px] h-[25px] rounded-full flex justify-center items-center cursor-pointer`}
            >
              {!saved ? (
                <Bookmark color="none" fill="gray" className="size-4" />
              ) : (
                <Bookmark color="none" fill="white" className="size-4" />
              )}
            </button>
            <button onClick={() => navigate(`/recipe/${recipe._id}/edit`)}>
              <SquarePen
                stroke="gray"
                className=" size-4 hover:stroke-orange-600 cursor-pointer"
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
          <p className="flex ">
            {<CookingPot className="size-[13px]" />}
            {recipe.category}
          </p>
          <p className="flex">
            {<ChartNoAxesColumnIncreasing className="size-[13px]" />}
            {recipe.difficultyLevel}
          </p>
          <p className="flex">
            {<Timer className="size-[13px]" />}
            {recipe.cookTime}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
