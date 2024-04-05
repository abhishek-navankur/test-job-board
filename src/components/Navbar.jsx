import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../redux/slices/authSlices";
import { useDispatch } from "react-redux";

export default function Navbar({ user }) {
  const dispatch = useDispatch();
  return (
    <nav className="mx-auto max-w-7xl px-8 py-3 flex items-center justify-between">
      <div>Logo</div>
      {user && (
        <div className="flex items-center gap-5">
          <Link to={"/"}>Home</Link>
          {user?.roles?.includes("applicant") && <ApplicantOnly />}
          {user?.roles?.includes("recruiter") && <RecruiterOnly />}

          <button
            onClick={() => dispatch(logout())}
            className="bg-red-600 px-2.5 py-1 rounded-md hover:bg-red-800 duration-300"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

const ApplicantOnly = () => {
  return (
    <>
      <Link to={"/jobs-applied"}>Applied</Link>
      <Link to={"/profile"}>Profile</Link>
    </>
  );
};

const RecruiterOnly = () => {
  return (
    <>
      <Link to={"/jobs-posted"}>Posted</Link>
    </>
  );
};
