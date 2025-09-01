import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LoginSignupPage from "./pages/LoginSignup/LoginSignupPage";
import HomePage from "./pages/Home/HomePage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Wrapper from "./wrapper";
import FavoritesPage from "./pages/Favorites/FavoritesPage";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginSignupPage />} />
        <Route element={<Wrapper />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
