import { useNavigate } from "react-router-dom";
import loginImg from "@/assets/images/login.jpg";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useState } from "react";
import { supabase } from "../../supabaseClient";

const LoginSignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginSignup, setLoginSignup] = useState("login");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loginSignup === "login") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) return alert(error.message);
      navigate("/home");
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
      });
      if (error) return alert(error.message);
      alert("Signup successful! Please check your email to confirm.");
      setLoginSignup("login");
    }
  };

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2 p-4 flex flex-col">
      <img
        className="h-[180px] w-full lg:h-full lg:col-span-1 object-cover rounded-[24px]"
        src={loginImg}
        alt="flower background"
      />
      <div className="flex lg:flex-col lg:relative justify-center lg:items-center pb-16">
        <div className="w-[350px] flex flex-col justify-start m-4 gap-4">
          <div className="flex flex-col gap-3">
            <h1 className="lg:text-4xl text-2xl">Welcome 👋</h1>
            <p className="lg:text-[20px]">
              Today is a new day! Start managing your recipes with re.plan.
            </p>
          </div>
          {loginSignup === "login" ? (
            <LoginForm
              handleSubmit={handleSubmit}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          ) : (
            <SignupForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
            />
          )}

          {loginSignup === "login" ? (
            <p className="mx-auto mb-4">
              Don't have an account?{" "}
              <button
                onClick={() => {
                  setLoginSignup("signup");
                  setName("");
                  setEmail("");
                  setPassword("");
                  setConfirmPassword("");
                }}
                className="text-blue-800"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p className="mx-auto mb-4">
              Already have an account?{" "}
              <button
                onClick={() => {
                  setLoginSignup("login");
                  setName("");
                  setEmail("");
                  setPassword("");
                  setConfirmPassword("");
                }}
                className="text-blue-800"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignupPage;
