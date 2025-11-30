import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/authStore";

export default function RequireAuth({ children }) {
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser({ id: payload.id, username: payload.username });
    } catch (err) {
      console.error("Invalid token");
      setUser(null);
    }
  }, []);

  if (user === undefined) return <p>Loading...</p>;
  if (!user) return <Navigate to="/" />;

  return children;
}
