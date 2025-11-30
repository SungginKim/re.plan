import { useNavigate } from "react-router-dom";
import loginImg from "@/assets/images/login.jpg";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useState } from "react";

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
      try {
        const res = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          return alert(data.message);
        }

        localStorage.setItem("token", data.token);
        navigate("/home");
      } catch (err) {
        console.error(err);
        alert("Login failed");
      }
    } else {
      if (password !== confirmPassword) {
        return alert("Passwords do not match");
      }

      try {
        const res = await fetch("http://localhost:5000/api/users/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: name, email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          return alert(data.message);
        }

        alert("Signup successful! You can now log in.");
        setLoginSignup("login");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } catch (err) {
        console.error(err);
        alert("Signup failed");
      }
    }
  };

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2 p-4 flex flex-col">
      <img
        className="h-[180px]  lg:h-full lg:col-span-1 object-cover rounded-[24px]"
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
                className="text-blue-800 cursor-pointer"
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
                className="text-blue-800 cursor-pointer"
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
