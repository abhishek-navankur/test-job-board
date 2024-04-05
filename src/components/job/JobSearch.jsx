import React, { useState } from "react";
import { debounce } from "lodash";
import { toast } from "react-toastify";
import JobCard from "./JobCard";

export default function JobSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const debouncedUpdateURL = debounce((query) => {
    fetchData(query);
  }, 1000);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedUpdateURL(query);
  };

  const fetchData = async (query) => {
    try {
      if (query.trim() === "") {
        setSearchResults([]); // Clear search results if query is empty
      } else {
        const response = await fetch(`http://localhost:3001/jobs?q=${query}`);
        const data = await response.json();
        setSearchResults(data);
      }
    } catch (error) {
      toast.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    debouncedUpdateURL(searchQuery);
  }, [searchQuery]);

  return (
    <div className="mt-5">
      <div className="space-y-2">
        <h3 className="text-2xl">Find a job</h3>
        <input
          type="search"
          placeholder="Search Jobs using keywords"
          className="w-full max-w-sm px-3 py-1"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <section className="grid gap-5 lg:grid-cols-2 mt-5">
        {searchResults.length > 0 ? (
          <>
            {searchResults.map((job) => (
              <JobCard job={job} key={job.id} />
            ))}
          </>
        ) : (
          <>No Results.</>
        )}
      </section>
    </div>
  );
}
