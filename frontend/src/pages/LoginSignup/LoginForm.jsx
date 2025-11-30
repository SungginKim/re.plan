import React from "react";

const LoginForm = ({
  handleSubmit,
  email,
  setEmail,
  password,
  setPassword,
}) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          className=" bg-[#F7FBFF] border-1 border-[#D4D7E3] rounded-xl p-2 my-2"
          type="text"
          id="email"
          required
          value={email}
          placeholder="user@email.com"
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <input
          className=" bg-[#F7FBFF] border-1 border-[#D4D7E3] rounded-xl p-2 my-2"
          type="password"
          id="password"
          required
          value={password}
          placeholder="Enter password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="bg-[#FF7518] py-2 rounded-xl text-white cursor-pointer"
      >
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
