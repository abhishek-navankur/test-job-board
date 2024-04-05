import { Link } from "react-router-dom";

export default function JobCard({ job, applied = false, recruiter = false }) {
  let url;
  if (recruiter) {
    url = `/jobs-posted/${job.id}`;
  } else {
    url = `/jobs/${job.id}`;
  }
  return (
    <Link
      to={url}
      className={` duration-200 border block p-3 rounded ${
        applied || recruiter
          ? "bg-gray-600/20 hover:bg-gray-700/40"
          : "bg-purple-600/20 hover:bg-purple-700/40"
      }`}
    >
      <h4 className="text-xl font-semibold">{job.title}</h4>
      <h5 className="text-xs">{job.location}</h5>
      <p className="line-clamp-3 mt-2 text-sm">{job.description}</p>
      {recruiter && <p className=" text-sm">Total Applicants: {job.applicants.length}</p>}
    </Link>
  );
}
