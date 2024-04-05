import React from "react";
import { postJob } from "../../utils/postJob";
import { useSelector } from "react-redux";

export default function PostJob() {
  const { user } = useSelector((state) => state.auth);

  const handlePostJob = async (e) => {
    e.preventDefault();
    let title = e.target[0].value;
    let description = e.target[1].value;
    let location = e.target[2].value;
    let keywords = e.target[3].value;
    let formData = {
      title: title,
      description: description,
      location: location,
      recruiterID: user.id,
      keywords: keywords.split(",").map((item) => item.trim()),
    };

    await postJob({ formData }).then((response) => {
      if (response.success) {
        e.target.reset();
        response.data
      }
    });
  };
  return (
    <section className="mt-10 max-w-xl">
      <form
        onSubmit={handlePostJob}
        className="bg-black/30 p-5 space-y-5 rounded-md shadow"
      >
        <input
          type="text"
          required
          className="w-full px-3 py-1 rounded"
          placeholder="Title"
        />
        <textarea
          rows="10"
          required
          className="w-full px-3 py-1 rounded resize-none"
          placeholder="Description"
        ></textarea>
        <input
          type="text"
          required
          className="w-full px-3 py-1 rounded"
          placeholder="Location"
        />
        <input
          type="text"
          required
          className="w-full px-3 py-1 rounded"
          placeholder="Seperate Keywords by Commas ..."
        />
        <button
          type="submit"
          className="bg-purple-900 hover:bg-purple-950 duration-300 rounded px-4 py-1.5 block w-full"
        >
          Post
        </button>
      </form>
    </section>
  );
}
