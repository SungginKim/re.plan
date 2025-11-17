const API_URL = "http://localhost:5000/api/recipes";

export async function getRecipes() {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch recipes");
    const data = await res.json();
    return data.data;
    //Note to self: backend is {success, data}
}

export async function createRecipe(recipe) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(recipe)
    });
    if (!res.ok) throw new Error("Failed to create recipe");
    const data = await res.json();
    return data.data;
}

export async function deleteRecipe(id) {
    await fetch(`${API_URL}/${id}`,
        {
            method: "DELETE"
        }
    );
}

export async function updatedRecipe(id, updateRecipe) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(updateRecipe)
    });
    if (!res.ok) throw new Error("Failed to update recipe");
    const data = await res.json();
    return data.data;
}