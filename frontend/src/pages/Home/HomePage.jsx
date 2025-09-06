import React from "react";
import bg from '@/assets/images/bg.png'
import { Plus } from "lucide-react";
import RecipeCard from "@/components/RecipeCard";

const user = { name: "Sunggin Kim" };
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

const HomePage = () => {
  return (
    <div className="bg-[#F5F6FA] w-full min-h-screen md:p-8 p-3 relative">
      <div className="w-full flex flex-col flex-1 gap-2">
        <h1 className="lg:text-3xl md:text-2xl text-lg font-semibold">{`Welcome, ${user.name}!`}</h1>
        <div className="relative">
          <img
            className="w-full object-cover md:rounded-lg rounded-md"
            src={bg}
            alt="background image"
          />
          <div className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 flex flex-col lg:gap-5 md:gap-3">
            <h2 className="lg:text-5xl md:text-3xl sm:text-xl font-bold text-white">
              Re.plan your <br /> kitchen routine
            </h2>
            <h3 className="lg:text-xl md:text-md text-[10px] text-white">
              Keep all your favorite recipes in one place
            </h3>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-4">
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} />
        ))}
      </div>
      <button className="fixed z-50 w-12 h-12 bg-[#FF7518] rounded-full bottom-3 right-3 md:bottom-8 md:right-8 flex justify-center items-center cursor-pointer shadow-lg">
        <Plus color="white" />
      </button>
    </div>
  );
}

export default HomePage;
