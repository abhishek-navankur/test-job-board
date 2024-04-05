import { useEffect, useState } from "react";
import JobCard from "../../components/job/JobCard";
import { Link } from "react-router-dom";

export default function JobsPosted({ user }) {
  const [jobs, setJobs] = useState([]);
  const fetchData = async () => {
    const response = await fetch(
      `http://localhost:3001/jobs?recruiterID=${user.id}`
    );
    if (response.ok) {
      const jobs = await response.json();
      setJobs(jobs);
    } else {
      toast.error("Failed to fetch jobs");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <section className="max-w-xl">
      {jobs.length > 0 ? (
        <>
          {jobs.map((job) => (
            <JobCard recruiter job={job} key={job.id} />
          ))}
        </>
      ) : (
        <>Get Started by Posting a Job <Link to={'/'} className="underline underline-offset-4 text-purple-400">Home</Link></>
      )}
    </section>
  );
}
