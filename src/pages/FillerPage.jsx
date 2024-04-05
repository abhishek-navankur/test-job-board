import React from "react";
import { Link } from "react-router-dom";

export default function FillerPage({ type = "404" }) {
  return (
    <section className="h-[calc(100vh-200px)] grid place-content-center">
      <h1 className="text-4xl font-semibold">
        {type == "unauthorized" ? "You are not allowed here" : "Page Not Found"}
      </h1>
      <Link to={"/"} className="bg-purple-800 px-2 py-1 text-center mt-5 rounded">Home</Link>
    </section>
  );
}
