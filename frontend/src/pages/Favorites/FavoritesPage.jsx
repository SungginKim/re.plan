import React from "react";
import { Plus } from "lucide-react";
import RecipeCard from "@/components/RecipeCard";

const recipes = [
  {
    name: "Spaghetti Carbonara",
    favorite: true,
    category: "Main Course",
    difficulty: "Medium",
    time: 30,
  },
  {
    name: "Chocolate Chip Cookies",
    favorite: false,
    category: "Dessert",
    difficulty: "Easy",
    time: 25,
  },
  {
    name: "Caesar Salad",
    favorite: false,
    category: "Salad",
    difficulty: "Easy",
    time: 15,
  },
  {
    name: "Beef Stir-Fry",
    favorite: true,
    category: "Main Course",
    difficulty: "Medium",
    time: 20,
  },
  {
    name: "Banana Pancakes",
    favorite: true,
    category: "Breakfast",
    difficulty: "Easy",
    time: 15,
  },
  {
    name: "Chicken Curry",
    favorite: false,
    category: "Main Course",
    difficulty: "Hard",
    time: 45,
  },
  {
    name: "Fruit Salad",
    favorite: true,
    category: "Dessert",
    difficulty: "Easy",
    time: 10,
  },
  {
    name: "Grilled Cheese Sandwich",
    favorite: false,
    category: "Snack",
    difficulty: "Easy",
    time: 10,
  },
  {
    name: "Grilled Cheese Sandwich",
    favorite: false,
    category: "Snack",
    difficulty: "Easy",
    time: 10,
  },
  {
    name: "Grilled Cheese Sandwich",
    favorite: false,
    category: "Snack",
    difficulty: "Easy",
    time: 10,
  },
];

const FavoritesPage = () => {
  return (
    <div className="bg-[#F5F6FA] w-full min-h-screen md:p-8 p-3 relative">
      <h1 className="lg:text-3xl md:text-2xl text-lg font-semibold font-nunito">
        Saved Recipes
      </h1>
      <hr />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-4">
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
