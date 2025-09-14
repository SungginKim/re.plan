import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LoginSignupPage from "./pages/LoginSignup/LoginSignupPage";
import HomePage from "./pages/Home/HomePage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Wrapper from "./wrapper";
import FavoritesPage from "./pages/Favorites/FavoritesPage";
import SettingsPage from "./pages/Settings/SettingsPage";
import CreateRecipe from "./pages/CreateRecipe/CreateRecipe";
import RequireAuth from "./auth";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginSignupPage />} />
        <Route element={<Wrapper />}>
          <Route
            path="/home"
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          />
          <Route
            path="/favorites"
            element={
              <RequireAuth>
                <FavoritesPage />
              </RequireAuth>
            }
          />
          <Route
            path="/settings"
            element={
              <RequireAuth>
                <SettingsPage />
              </RequireAuth>
            }
          />
        </Route>
        <Route
          path="/create-recipe"
          element={
            <RequireAuth>
              <CreateRecipe />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
