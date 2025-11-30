import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import recipeRoutes from "./routes/recipe.route.js";
import authRoutes from "./routes/auth.js";
import favoriteRoutes from "./routes/favorites.route.js"


const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use("/api/recipes", recipeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/favorites", favoriteRoutes);

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server started at http://localhost:${process.env.PORT || 5000}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
    });
