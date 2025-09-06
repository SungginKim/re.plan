import React from "react";
import Searchbar from "@/components/Searchbar";
import Dropdown from "@/components/Dropdown";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { Outlet } from "react-router-dom";
import Sidenav from "./components/Sidenav";
import { NotepadText, Bookmark, SlidersHorizontal } from "lucide-react";
import profile from "@/assets/images/profile.jpg";

const content = [
  { title: "Recipes", url: "/home", icon: <NotepadText /> },
  { title: "Favorites", url: "/favorites", icon: <Bookmark /> },
];

const utility = [
  { title: "Settings", url: "/settings" },
  { title: "Logout", url: "/" },
];
const user = { name: "Sunggin Kim", avatar: profile };

const categories = ["Appetizer", "Main", "Side", "Dessert", "Snack", "Drink"];

const Wrapper = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen">
        <Sidenav content={content} utility={utility} user={user} />
        <SidebarTrigger className="block md:hidden ml-6 mt-4" />
        <div className="flex flex-1 flex-col">
          <div className="flex bg-white h-[50px] w-full justify-end items-center gap-5 px-5">
            <Searchbar />
            <div className="hidden sm:block">
              <Dropdown items={categories} placeholder="Categories" />
            </div>
            <div className="block sm:hidden">
              <Dropdown
                items={categories}
                placeholder={<SlidersHorizontal size={18} />}
              />
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Wrapper;
