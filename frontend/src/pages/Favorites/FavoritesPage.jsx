import { React, useState } from "react";
import RecipeCard from "@/components/RecipeCard";
import { useRecipeStore } from "@/stores/recipeStore";
import Modal from "@/components/Modal";
import { useOutletContext } from "react-router";

const FavoritesPage = () => {
  const favorites = useRecipeStore((state) => state.favorites);
  const removeRecipe = useRecipeStore((state) => state.removeRecipe);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const { category, search } = useOutletContext();
  const filteredFavorites = favorites.filter((recipe) => {
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
      <h1 className="lg:text-3xl md:text-2xl text-lg font-semibold font-nunito">
        Saved Recipes
      </h1>
      <hr />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-4">
        {filteredFavorites.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            onDeleteRequest={handleDeleteRequest}
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

export default FavoritesPage;
