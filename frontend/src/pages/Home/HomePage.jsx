import { React, useState, useEffect } from "react";
import bg from "@/assets/images/bg.png";
import { useRecipeStore } from "@/stores/recipeStore";
import { useAuthStore } from "@/stores/authStore";

import RecipeCard from "@/components/RecipeCard";
import Modal from "@/components/Modal";
import { useOutletContext } from "react-router";

const HomePage = () => {
  const { category, search } = useOutletContext();
  const user = useAuthStore((state) => state.user);
  const recipes = useRecipeStore((state) => state.recipes);
  const favorites = useRecipeStore((state) => state.favorites);
  const loadFavorites = useRecipeStore((state) => state.loadFavorites);
  const loading = useRecipeStore((state) => state.loading);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const removeRecipe = useRecipeStore((state) => state.removeRecipe);

  if (!recipes || loading) {
    return <div>Loading recipes...</div>;
  }
  useEffect(() => {
    if (user) loadFavorites();
  }, [user]);

  const filteredRecipes = recipes.filter((recipe) => {
    const matchedSearch = recipe.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchedCategory =
      !category || category === "All"
        ? true
        : recipe.category.toLowerCase() === category.toLowerCase();
    return matchedSearch && matchedCategory;
  });
  const handleDeleteRequest = (id) => {
    setSelectedRecipeId(id);
    setOpenModal(true);
  };

  const confirmDelete = () => {
    removeRecipe(selectedRecipeId);
    setOpenModal(false);
    setSelectedRecipeId(null);
  };
  return (
    <div className="bg-[#F5F6FA] w-full min-h-screen md:p-8 p-3 relative">
      <div className="w-full flex flex-col flex-1 gap-2">
        <h1 className="lg:text-3xl md:text-2xl text-lg font-semibold font-nunito">{`Welcome, ${user.username}!`}</h1>
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
        {filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            onDeleteRequest={handleDeleteRequest}
            isSaved={
              Array.isArray(favorites) &&
              favorites.some((fav) => fav?._id === recipe._id)
            }
          />
        ))}
      </div>
      {openModal && (
        <Modal
          title="Are you sure?"
          bodyText="This action cannot be undone. Are you sure you want to delete this recipe?"
          confirmText="Delete"
          handleDelete={confirmDelete}
          handleCancel={setOpenModal}
        />
      )}
    </div>
  );
};

export default HomePage;
