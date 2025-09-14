import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../src/supabaseClient";

export default function RequireAuth({ children }) {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));

    return () => subscription.unsubscribe();
  }, []);

  if (session === undefined) return <p>Loading...</p>;
  if (!session) return <Navigate to="/" />;

  return children;
}
