import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { login } from "../redux/slices/authSlices";
import loginHelper from "../utils/loginHelper";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/slices/authSlices";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let email = e.target[0].value;
    let password = e.target[1].value;
    await loginHelper(email, password).then((result) => {
      if (result.success) {
        dispatch(login(result.user));
        navigate("/");
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-5 bg-black/30 max-w-sm space-y-3 mx-auto mt-20 rounded-lg text-sm shadow-md"
    >
      <label className="text-lg">Login</label>

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
      <button
        type="submit"
        className="bg-purple-700 hover:bg-purple-800 duration-300 px-5 py-2 w-full rounded-md"
      >
        Login
      </button>

      <p>
        New Here?{" "}
        <Link to={"/signup"} className="text-purple-600 hover:underline">
          Signup
        </Link>
      </p>
    </form>
  );
}
