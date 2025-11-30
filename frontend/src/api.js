const API_URL = "http://localhost:5000/api/recipes";
const getToken = () => localStorage.getItem("token");
export async function getRecipes() {
    const token = getToken();
    const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to fetch recipes");
    const data = await res.json();
    return data.data;
}

export async function createRecipe(recipe) {
    const token = getToken();
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(recipe)
    });
    if (!res.ok) throw new Error("Failed to create recipe");
    const data = await res.json();
    return data.data;
}

export async function deleteRecipe(id) {
    const token = getToken();
    await fetch(`${API_URL}/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
}

export async function updatedRecipe(id, updateRecipe) {
    const token = getToken();
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateRecipe)
    });
    if (!res.ok) throw new Error("Failed to update recipe");
    const data = await res.json();
    return data.data;
}