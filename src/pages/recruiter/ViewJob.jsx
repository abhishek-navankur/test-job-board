import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { timeFormater } from "../../utils/timeFormater";
import { list } from "postcss";

export default function ViewJob() {
  const { slug } = useParams();
  let initialData = {
    title: "",
    description: "",
    location: "",
    timestamp: "",
    applicants: "",
  };
  const [data, setData] = React.useState(initialData);
  const navigate = useNavigate();
  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/jobs/${slug}`);
      const data = await response.json();
      setData(data);
      return data;
    } catch (error) {
      toast.error("Error fetching data:", error);
    }
  };
  return (
    <section>
      <button onClick={() => navigate(-1)}>Go back</button>

      <div className="max-w-xl my-5 border p-3 rounded-md">
        <h3 className="text-xl font-medium mb-2">{data.title}</h3>
        <h5 className="text-base">{data.location}</h5>
        <h5 className="text-xs my-1">
          {data.timestamp && timeFormater(data.timestamp)}
        </h5>
        <p className="text-base my-3">{data.description}</p>
      </div>
      <h3 className="text-xl font-semibold">Applicants Applied</h3>
      <div className="space-y-2 mt-3">
        {data.applicants.length > 0 &&
          data?.applicants?.map((applicant) => (
            <Link
              key={applicant.applicant.id}
              className="block bg-purple-800/40 max-w-fit p-3 rounded"
              to={`/applicant-profile/${applicant.applicant.id}`}
            >
              {applicant.applicant.username}
            </Link>
          ))}
      </div>
    </section>
  );
}
