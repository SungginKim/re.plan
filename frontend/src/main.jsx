import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LoginSignupPage from "./pages/LoginSignup/LoginSignupPage";
import HomePage from "./pages/Home/HomePage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Wrapper from "./wrapper";
import FavoritesPage from "./pages/Favorites/FavoritesPage";
import CreateRecipe from "./pages/CreateRecipe/CreateRecipe";
import RequireAuth from "./authJWT";
import FullRecipePage from "./pages/FullRecipe/FullRecipePage";

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
    
        </Route>
        <Route
          path="/create-recipe"
          element={
            <RequireAuth>
              <CreateRecipe />
            </RequireAuth>
          }
        />
        <Route
          path="/recipe/:id"
          element={
            <RequireAuth>
              <FullRecipePage />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
