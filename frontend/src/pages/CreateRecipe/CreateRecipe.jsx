import React, { useState } from "react";
import { ArrowLeft, Save, X } from "lucide-react";
import Dropdown from "@/components/Dropdown";
import { useRecipeStore } from "@/stores/recipeStore";
import { useNavigate } from "react-router-dom";

const categories = ["Appetizer", "Main", "Side", "Dessert"];
const difficultyLevels = ["Easy", "Moderate", "Difficult"];

const CreateRecipe = () => {
  const [title, setTitle] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [servings, setServings] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientQty, setIngredientQty] = useState("");
  const [category, setCategory] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");

  const [instructions, setInstructions] = useState([]);
  const [instructionStep, setInstructionStep] = useState("");
  const navigate = useNavigate();

  const addRecipe = useRecipeStore((state) => state.addRecipe);

  const handleSaveRecipe = async (e) => {
    e.preventDefault();
    const newRecipe = {
      title,
      category,
      difficultyLevel,
      servings: Number(servings),
      prepTime: Number(prepTime),
      cookTime: Number(cookTime),
      ingredients,
      instructions: instructions.map((item) => item.text),
    };

    try {
      await addRecipe(newRecipe);
      setTitle("");
      setServings("");
      setCategory("");
      setDifficultyLevel("");
      setCookTime("");
      setPrepTime("");
      setIngredients([]);
      setIngredientName("");
      setIngredientQty("");
      setInstructions([]);
      setInstructionStep("");

      navigate("/home");
    } catch (error) {
      console.log("Failed to save recipe", error);
      alert("Please fill in all required fields");
    }
  };

  const handleAddInstructions = (e) => {
    e.preventDefault();
    if (!instructionStep) return;
    setInstructions([
      ...instructions,
      { id: Date.now(), text: instructionStep },
    ]);
    setInstructionStep("");
  };

  const handleAddIngredients = (e) => {
    e.preventDefault();
    if (!ingredientName || !ingredientQty) return;
    setIngredients([
      ...ingredients,
      { name: ingredientName, qty: ingredientQty },
    ]);
    setIngredientName("");
    setIngredientQty("");
  };

  return (
    <div className="bg-[#F5F6FA] w-full min-h-screen md:p-8 p-3">
      <form onSubmit={handleSaveRecipe}>
        <div className="flex justify-between items-center pb-3">
          <h1 className="lg:text-3xl md:text-2xl sm:text-xl text-lg font-semibold font-nunito">
            Create a Recipe!
          </h1>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => navigate("/home")}
              className="w-fit rounded-full border-2 border-gray-400 px-2 py-1 flex gap-1 font-semibold text-gray-700 cursor-pointer"
            >
              <ArrowLeft color="gray" />
              Go Back
            </button>
            <button
              type="submit"
              className="cursor-pointer w-fit rounded-full border-2 border-orange-custom px-2 py-1 flex gap-1 bg-orange-custom font-semibold text-white"
            >
              <Save />
              Save
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 items-stretch md:min-h-screen">
          <div className="bg-white rounded-xl p-4 flex flex-col gap-4 md:min-h-screen">
            <div>
              <label className="text-gray-700 block mb-1">Title</label>
              <input
                className="border border-gray-500 rounded-sm px-2 py-1 w-full"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col">
                <label className="text-gray-700 block mb-1">Category</label>
                <Dropdown
                  items={categories}
                  placeholder="Select a Category"
                  value={category}
                  onChange={setCategory}
                  className="w-full"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700 block mb-1">
                  Difficulty Level
                </label>
                <Dropdown
                  items={difficultyLevels}
                  placeholder="Select a Category"
                  value={difficultyLevel}
                  onChange={setDifficultyLevel}
                  className="w-full"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col">
                <label className="text-gray-700 block mb-1">Prep Time</label>
                <input
                  type="number"
                  placeholder="0 mins"
                  className="border border-gray-500 rounded-sm px-2 py-1 w-full"
                  value={prepTime}
                  onChange={(e) => setPrepTime(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700 block mb-1">Cooking Time</label>
                <input
                  type="number"
                  placeholder="0 mins"
                  className="border border-gray-500 rounded-sm px-2 py-1 w-full"
                  value={cookTime}
                  onChange={(e) => setCookTime(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700 block mb-1">Serving</label>
                <input
                  type="number"
                  placeholder="0 Servings"
                  className="border border-gray-500 rounded-sm px-2 py-1 w-full"
                  value={servings}
                  onChange={(e) => setServings(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 flex flex-col gap-4 md:min-h-screen">
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col col-span-2">
                <label className="text-gray-700 block mb-1">Ingredients</label>
                <input
                  type="text"
                  placeholder="Enter Ingredient"
                  value={ingredientName}
                  onChange={(e) => setIngredientName(e.target.value)}
                  className="border border-gray-500 rounded-sm px-2 py-1 w-full"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700 block mb-1">Quantity</label>
                <input
                  type="text"
                  placeholder="1 cup"
                  value={ingredientQty}
                  onChange={(e) => setIngredientQty(e.target.value)}
                  className="border border-gray-500 rounded-sm px-2 py-1 w-full"
                />
              </div>
            </div>
            <button
              onClick={handleAddIngredients}
              className="w-full bg-orange-custom text-white p-3 rounded-md cursor-pointer"
            >
              Add Ingredients
            </button>

            <ul className="w-full">
              {ingredients.map((item, i) => (
                <li
                  key={i}
                  className="grid grid-cols-4 gap-2 py-2 items-center"
                >
                  <span className="col-span-2 break-words">{item.name}</span>
                  <span>{item.qty}</span>
                  <button
                    className="flex justify-end"
                    onClick={() =>
                      setIngredients(ingredients.filter((_, idx) => idx !== i))
                    }
                  >
                    <X />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-xl p-4 flex flex-col gap-4 md:min-h-screen">
            <label className="text-gray-700 block mb-1">Instructions</label>
            <textarea
              placeholder="Enter Instruction"
              value={instructionStep}
              onChange={(e) => setInstructionStep(e.target.value)}
              className="border border-gray-500 rounded-sm px-2 py-1 w-full"
            />
            <button
              onClick={handleAddInstructions}
              className="w-full bg-orange-custom text-white p-3 rounded-md cursor-pointer"
            >
              Add Instruction
            </button>

            <ol className="list-decimal list-outside pl-6">
              {instructions.map((item) => (
                <li key={item.id} className="py-2">
                  <div className="flex justify-between items-start">
                    <span className="flex-1">{item.text}</span>
                    <button
                      className="ml-2"
                      onClick={() =>
                        setInstructions(
                          instructions.filter(
                            (instruction) => instruction.id !== item.id
                          )
                        )
                      }
                    >
                      <X />
                    </button>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateRecipe;
