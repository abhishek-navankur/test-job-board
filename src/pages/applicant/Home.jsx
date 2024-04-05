import React from "react";
import JobSearch from "../../components/job/JobSearch";
import PostJob from "../recruiter/PostJob";

export default function Home({ user }) {
  if (!user) return window.location.replace("/login");
  if (user?.roles.find((role) => role === "applicant")) {
    if (!user.exp.college) window.location.replace("/profile");
    return (
      <>
        <h1 className="text-lg">Hey {user.username}!</h1>
        <JobSearch />
      </>
    );
  } else if (user?.roles.find((role) => role === "recruiter")) {
    return (
      <>
        <h1 className="text-lg">Hey {user.username}!</h1>
        <PostJob />
      </>
    );
  }
}
