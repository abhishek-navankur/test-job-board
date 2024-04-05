import React from "react";
import { Link, useNavigate } from "react-router-dom";
import signupHelper from "../utils/signupHelper";

export default function Signup() {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    const userType = document.querySelector(
      'input[name="userType"]:checked'
    ).value;
    await signupHelper(username, email, password, userType).then((result) => {
      if (result.success) {
        navigate("/login");
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-5 bg-black/30 max-w-sm space-y-3 mx-auto mt-20 rounded-lg text-sm shadow-md"
    >
      <label className="text-lg">Signup</label>
      <input
        required
        type="username"
        placeholder="Full Name"
        className="px-3 py-2 w-full bg-transparent border rounded-md"
      />
      <input
        required
        type="email"
        placeholder="Email"
        className="px-3 py-2 w-full bg-transparent border rounded-md"
      />
      <input
        required
        type="password"
        placeholder="Password"
        className="px-3 py-2 w-full bg-transparent border rounded-md"
      />
      {/* radio */}
      <div className="flex items-center justify-between gap-2">
        <label className="w-full text-center border border-purple-500/70 h-10 rounded-md overflow-hidden cursor-pointer inline-block relative">
          <input
            required
            type="radio"
            name="userType"
            value="applicant"
            className="hidden peer"
          />
          <div className="peer-checked:bg-purple-600/50 p-2 text-center absolute left-0 top-0 w-full h-full">
            Applicant
          </div>
        </label>
        <label className="w-full text-center border border-purple-500/70 h-10 rounded-md overflow-hidden cursor-pointer inline-block relative">
          <input
            required
            type="radio"
            name="userType"
            value="recruiter"
            className="hidden peer"
          />
          <div className="text-center peer-checked:bg-purple-600/50 p-2 absolute left-0 top-0 w-full h-full">
            Recruiter
          </div>
        </label>
      </div>

      <button
        type="submit"
        className="bg-purple-700 hover:bg-purple-800 duration-300 px-5 py-2 w-full rounded-md"
      >
        Signup
      </button>

      <p>
        Already registered?{" "}
        <Link to={"/login"} className="text-purple-600 hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}
