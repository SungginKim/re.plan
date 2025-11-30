import { useParams, useNavigate } from "react-router-dom";
import { useRecipeStore } from "@/stores/recipeStore";
import { ArrowLeft, SquarePen } from "lucide-react";

const FullRecipePage = () => {
  const { id } = useParams();
  const recipes = useRecipeStore((state) => state.recipes);
  const navigate = useNavigate();

  const recipe = recipes.find((r) => r._id === id);

  if (!recipe) {
    return <p className="p-4">Recipe not found.</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 float-end">
        <button
          type="button"
          onClick={() => navigate("/home")}
          className="group w-fit rounded-full border-2 border-gray-400 px-2 py-1 flex gap-1 font-semibold text-gray-700 cursor-pointer hover:text-orange-600 hover:border-orange-600"
        >
          <ArrowLeft className="stroke-gray-500 group-hover:stroke-orange-500 cursor-pointer" />
          Go Back
        </button>
        <button onClick={() => navigate(`/recipe/${id}/edit`)}>
          <SquarePen className="float-right hover:stroke-orange-600 cursor-pointer" />
        </button>
      </div>

      <div>
        <h1 className="text-5xl font-bold mb-2 py-2">{recipe.title}</h1>
        <div className="flex flex-wrap gap-2">
          <div className="tags">
            <p>{recipe.category}</p>
          </div>
          <div className="tags">
            <p>{recipe.difficultyLevel}</p>
          </div>
          <div className="tags">
            <p>Cook: {recipe.cookTime} mins</p>
          </div>
          <div className="tags">
            <p>Prep: {recipe.prepTime} mins</p>
          </div>
        </div>
      </div>
      <hr className="my-4" />
      <h2 className="text-xl font-bold mb-2">Ingredients</h2>
      {recipe.ingredients && recipe.ingredients.length > 0 ? (
        <div>
          <ul className="list-disc mx-8">
            {recipe.ingredients.map((ing, idx) => (
              <li key={idx}>
                {ing.name} - {ing.qty}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500 italic">No Ingredients...</p>
      )}
      <hr className="my-4" />
      <h2 className="text-xl font-bold mb-2">Instructions</h2>
      {recipe.instructions && recipe.instructions.length > 0 ? (
        <div>
          <div>
            <ol className="list-decimal mx-8">
              {recipe.instructions.map((ins, idx) => (
                <li key={idx}>{ins}</li>
              ))}
            </ol>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 italic">No Instructions..</p>
      )}
      <hr className="my-4" />
      <h2 className="text-xl font-bold mb-2">Notes</h2>
      {recipe.notes ? (
        <p className="whitespace-pre-wrap">{recipe.notes}</p>
      ) : (
        <p className="text-gray-500 italic">No Notes...</p>
      )}
    </div>
  );
};

export default FullRecipePage;
