import React, { useEffect, useState } from "react";
import { ArrowLeft, Save, X } from "lucide-react";
import Dropdown from "@/components/Dropdown";
import { useRecipeStore } from "@/stores/recipeStore";
import { useNavigate, useParams } from "react-router-dom";

const categories = ["Appetizer", "Main", "Side", "Dessert"];
const difficultyLevels = ["Easy", "Moderate", "Difficult"];

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r._id === id)
  );

  const editRecipe = useRecipeStore((state) => state.editRecipe);

  const [title, setTitle] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [servings, setServings] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientQty, setIngredientQty] = useState("");
  const [category, setCategory] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [notes, setNotes] = useState("");

  const [instructions, setInstructions] = useState([]);
  const [instructionStep, setInstructionStep] = useState("");

  useEffect(() => {
    if (!recipe) return;

    setTitle(recipe.title);
    setCategory(recipe.category || "");
    setDifficultyLevel(recipe.difficultyLevel || "");
    setServings(recipe.servings || "");
    setPrepTime(recipe.prepTime || "");
    setCookTime(recipe.cookTime || "");

    setIngredients(recipe.ingredients || []);

    setInstructions(
      (recipe.instructions || []).map((text, idx) => ({
        id: idx + 1,
        text,
      }))
    );
    setNotes(recipe.notes || "");
  }, [recipe]);
  const handleUpdateRecipe = async (e) => {
    e.preventDefault();

    const updatedRecipe = {
      title,
      category,
      difficultyLevel,
      servings: Number(servings),
      prepTime: Number(prepTime),
      cookTime: Number(cookTime),
      ingredients,
      instructions: instructions.map((item) => item.text),
      notes,
    };

    try {
      await editRecipe(id, updatedRecipe);
      navigate("/home");
    } catch (error) {
      console.error("Failed to update recipe", error);
      alert("Failed to update recipe");
    }
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

  const handleAddInstructions = (e) => {
    e.preventDefault();
    if (!instructionStep) return;
    setInstructions([
      ...instructions,
      { id: Date.now(), text: instructionStep },
    ]);
    setInstructionStep("");
  };

  if (!recipe) return <p className="p-6">Recipe not found…</p>;

  return (
    <div className="bg-[#F5F6FA] w-full min-h-screen md:p-8 p-3">
      <form onSubmit={handleUpdateRecipe}>
        <div className="flex justify-between items-center pb-3">
          <h1 className="lg:text-3xl md:text-2xl sm:text-xl text-lg font-semibold font-nunito">
            Edit Recipe
          </h1>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => navigate("/home")}
              className="w-full sm:w-auto rounded-full border-2 border-gray-400 px-2 py-1 flex items-center gap-1 font-semibold text-gray-700 cursor-pointer justify-center text-sm sm:text-base"
            >
              <ArrowLeft color="gray" />
              Go Back
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto cursor-pointer rounded-full border-2 border-orange-custom px-2 py-1 flex items-center gap-1 bg-orange-custom font-semibold text-white justify-center text-sm sm:text-base"
            >
              <Save />
              Save Changes
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 items-stretch md:min-h-screen">
          <div className="bg-white rounded-xl p-4 flex flex-col gap-4 md:min-h-screen">
            <div>
              <label className="text-gray-700 block mb-1">Title</label>
              <input
                className="border border-gray-500 rounded-sm px-2 py-1 w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-gray-700 block mb-1">Category</label>
                <Dropdown
                  items={categories}
                  value={category}
                  onChange={setCategory}
                />
              </div>
              <div>
                <label className="text-gray-700 block mb-1">Difficulty</label>
                <Dropdown
                  items={difficultyLevels}
                  value={difficultyLevel}
                  onChange={setDifficultyLevel}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-gray-700 block mb-1">Prep Time</label>
                <input
                  type="number"
                  className="border border-gray-500 rounded-sm px-2 py-1 w-full"
                  value={prepTime}
                  onChange={(e) => setPrepTime(e.target.value)}
                />
              </div>
              <div>
                <label className="text-gray-700 block mb-1">Cook Time</label>
                <input
                  type="number"
                  className="border border-gray-500 rounded-sm px-2 py-1 w-full"
                  value={cookTime}
                  onChange={(e) => setCookTime(e.target.value)}
                />
              </div>
              <div>
                <label className="text-gray-700 block mb-1">Servings</label>
                <input
                  type="number"
                  className="border border-gray-500 rounded-sm px-2 py-1 w-full"
                  value={servings}
                  onChange={(e) => setServings(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 flex flex-col gap-4 md:min-h-screen">
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <label className="text-gray-700 block mb-1">Ingredient</label>
                <input
                  value={ingredientName}
                  onChange={(e) => setIngredientName(e.target.value)}
                  className="border border-gray-500 rounded-sm px-2 py-1 w-full"
                />
              </div>
              <div>
                <label className="text-gray-700 block mb-1">Quantity</label>
                <input
                  value={ingredientQty}
                  onChange={(e) => setIngredientQty(e.target.value)}
                  className="border border-gray-500 rounded-sm px-2 py-1 w-full"
                />
              </div>
            </div>

            <button
              onClick={handleAddIngredients}
              className="w-full bg-orange-custom text-white p-3 rounded-md"
            >
              Add Ingredient
            </button>

            <ul>
              {ingredients.map((item, i) => (
                <li
                  key={i}
                  className="grid grid-cols-4 gap-2 py-2 items-center"
                >
                  <span className="col-span-2 break-words">{item.name}</span>
                  <span>{item.qty}</span>
                  <button
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
              value={instructionStep}
              onChange={(e) => setInstructionStep(e.target.value)}
              className="border border-gray-500 rounded-sm px-2 py-1 w-full"
            />

            <button
              onClick={handleAddInstructions}
              className="w-full bg-orange-custom text-white p-3 rounded-md"
            >
              Add Instruction
            </button>

            <ol className="list-decimal pl-6">
              {instructions.map((item) => (
                <li key={item.id} className="py-2">
                  <div className="flex justify-between items-start">
                    <span>{item.text}</span>
                    <button
                      onClick={() =>
                        setInstructions(
                          instructions.filter((inst) => inst.id !== item.id)
                        )
                      }
                    >
                      <X />
                    </button>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-auto">
              <label className="text-gray-700 block mb-1">Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="border border-gray-500 rounded-sm px-2 py-1 w-full h-32 resize-none"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditRecipe;
