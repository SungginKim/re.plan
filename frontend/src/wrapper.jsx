import React from "react";
import Searchbar from "@/components/Searchbar";
import Dropdown from "@/components/Dropdown";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Link, Outlet, useLocation } from "react-router-dom";


const content = [
  { title: "Recipes", url: "/home" },
  { title: "Favorites", url: "/favorites" },
];
const utility = [
  { title: "Settings", url: "/settings" },
  { title: "Logout", url: "/logout" },
];

const categories = ["Appetizer", "Main", "Side", "Dessert", "Snack", "Drink"];

const Wrapper = () => {
    const location = useLocation();
  return (
    <>
      <SidebarProvider>
        <div className="flex h-screen w-screen bg-white">
          <Sidebar>
            <SidebarContent className="bg-white">
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {content.map((item) => {
                      
                        const isActive = location.pathname === item.url;
                      
                      return (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton
                            asChild
                            className={`${isActive ? "bg-[#FF7518] hover:bg-[#FF7518]" : ""}  rounded-md`}
                          >
                            <Link to={item.url}>{item.title}</Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {utility.map((item) => {
                        const isActive = location.pathname === item.url;
                        return (
                          <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                              asChild
                              className={`${isActive ? "bg-[#FF7518] hover:bg-[#FF7518]" : ""}  rounded-md`}
                            >
                              <Link to={item.url}>{item.title}</Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        );})}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <SidebarTrigger
            className="block md:hidden ml-6
           mt-4"
          />
          <div className="flex flex-1 flex-col">
            <div className=" flex bg-white h-[50px] w-full justify-end items-center gap-5 px-5">
              <Searchbar />
              <Dropdown items={categories} placeholder="Categories" />
            </div>
            <div className="flex-1 overflow-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
};

export default Wrapper;


