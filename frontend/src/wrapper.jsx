import React, { useEffect, useState } from "react";
import Searchbar from "@/components/Searchbar";
import Dropdown from "@/components/Dropdown";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { Outlet } from "react-router-dom";
import Sidenav from "./components/Sidenav";
import { NotepadText, Bookmark, SlidersHorizontal } from "lucide-react";
import CreateRecipeButton from "./components/CreateRecipeButton";
import { useLocation } from "react-router-dom";
import { useRecipeStore } from "./stores/recipeStore";
import { useAuthStore } from "./stores/authStore";

const content = [
  { title: "Recipes", url: "/home", icon: <NotepadText /> },
  { title: "Favorites", url: "/favorites", icon: <Bookmark /> },
];

const utility = [{ title: "Logout", isLogout: true }];

const categories = ["Appetizer", "Main", "Side", "Dessert", "All"];

const Wrapper = () => {
  const user = useAuthStore((state) => state.user);
  const loadRecipe = useRecipeStore((state) => state.loadRecipe);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      loadRecipe();
      fetch("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => useAuthStore.getState().setUser(data))
        .catch((err) => console.error("Failed to fetch user:", err));
    }
  }, [loadRecipe]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const currentPath = useLocation();
  const showCreateRecipeButton = ["/home", "/favorites"];
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen">
        <Sidenav content={content} utility={utility} user={user} />
        <SidebarTrigger className="block md:hidden ml-6 mt-4" />
        <div className="flex flex-1 flex-col">
          <div className="flex bg-white h-[50px] w-full justify-between items-center gap-5 px-5">
            <Searchbar value={search} onChange={setSearch} />
            <div className="hidden sm:block">
              <Dropdown
                items={categories}
                placeholder="Categories"
                value={category}
                onChange={setCategory}
              />
            </div>
            <div className="block sm:hidden">
              <Dropdown
                items={categories}
                value={category}
                onChange={setCategory}
                placeholder={<SlidersHorizontal size={18} />}
              />
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            <Outlet context={{ category, search }} />
            {showCreateRecipeButton.includes(currentPath.pathname) && (
              <CreateRecipeButton to={"/create-recipe"} />
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Wrapper;
