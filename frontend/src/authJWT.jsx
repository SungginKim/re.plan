import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function RequireAuth({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser({ id: payload.id, username: payload.username });
      } catch (err) {
        console.error("Invalid token");
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  if (user === undefined) return <p>Loading...</p>;
  if (!user) return <Navigate to="/" />;

  return children;
}
