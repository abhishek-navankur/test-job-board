import React from "react";
import { useSelector } from "react-redux";
import JobCard from "../../components/job/JobCard";
import { Link } from "react-router-dom";

export default function JobsApplied() {
  const { user } = useSelector((state) => state.auth);

  return (
    <section className="space-y-3 mt-5">
      <h3 className="text-2xl">Jobs Applied</h3>
      <div className="max-w-xl space-y-2">
        {user?.jobsApplied.length > 0 ? (
          user?.jobsApplied?.map((item) => (
            <JobCard applied job={item} key={item.id} />
          ))
        ) : (
          <h3 className="text-lg font-medium text-purple-400">
            Start Applying
          </h3>
        )}
      </div>
    </section>
  );
}
