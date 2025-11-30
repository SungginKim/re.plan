import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";

const Sidenav = ({ content, utility, user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  return (
    <Sidebar className=" border-white">
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col flex-1 justify-center items-center">
            <h1 className="font-bold  text-lg sm:text-2xl">
              <span className="text-[#FF7518]">Re.</span>plan
            </h1>
            <div className="flex flex-col flex-1 justify-center items-center gap-5 py-10">
              <img
                src={user.avatar}
                alt="user profile"
                className="rounded-full border-2 border-gray-400 object-center w-24 sm:w-30 md:w-32"
              />
              <h2 className="text-lg sm:text-xl font-semibold">{user.name}</h2>
            </div>
            <SidebarMenu>
              {content.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`${isActive ? "bg-[#FF7518] hover:bg-[#FF7518] text-white hover:text-white" : ""}  rounded-md py-4 text-sm md:py-6 md:text-md`}
                    >
                      <Link to={item.url}>
                        {item.icon}
                        <span className="ml-2">{item.title}</span>
                      </Link>
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
                if (item.isLogout) {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        className="rounded-md py-4 text-sm md:py-6 md:text-md hover:bg-gray-100 cursor-pointer text-red-700 font-semibold hover:text-red-700"
                        onClick={() => {
                          logout();
                          navigate("/");
                        }}
                      >
                        {item.title}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`${isActive ? "bg-[#FF7518] hover:bg-[#FF7518] text-white hover:text-white" : ""}  rounded-md py-4 text-sm md:py-6 md:text-md`}
                    >
                      <Link to={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default Sidenav;
