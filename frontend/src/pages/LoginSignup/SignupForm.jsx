import React from "react";

const SignupForm = ({
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label htmlFor="name">Name</label>
        <input
          className=" bg-[#F7FBFF] border-1 border-[#D4D7E3] rounded-xl p-2 my-2"
          type="text"
          id="name"
          value={name}
          placeholder="Name"
          required
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          className=" bg-[#F7FBFF] border-1 border-[#D4D7E3] rounded-xl p-2 my-2"
          type="text"
          id="email"
          value={email}
          required
          placeholder="user@email.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <input
          className=" bg-[#F7FBFF] border-1 border-[#D4D7E3] rounded-xl p-2 my-2"
          type="password"
          id="password"
          value={password}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          className=" bg-[#F7FBFF] border-1 border-[#D4D7E3] rounded-xl p-2 my-2"
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          placeholder="Enter password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button  type="submit" className="bg-[#FF7518] w-full py-2 rounded-xl text-white cursor-pointer">
        Sign up
      </button>
    </form>
  );
};

export default SignupForm;
