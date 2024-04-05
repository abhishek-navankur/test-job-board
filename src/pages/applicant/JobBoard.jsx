import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { timeFormater } from "../../utils/timeFormater";
import { applyForJob } from "../../utils/applyForJob";
import { useDispatch } from "react-redux";
import { updateJobsApplied } from "../../redux/slices/authSlices";

function JobBoard({ user }) {
  let initialData = {
    title: "",
    description: "",
    location: "",
    timestamp: "",
    applicants: "",
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [data, setData] = React.useState(initialData);

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

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleApply = async () => {
    await applyForJob({ user, applicationData: data }).then((response) => {
      if (response.success) {
        dispatch(
          updateJobsApplied({
            user,
            data: {
              id: data.id,
              title: data.title,
              description: data.description,
              location: data.location,
            },
          })
        );
        navigate("/");
      }
    });
  };

  function hasApplicantWithId(applicantsArray, targetId) {
    if (applicantsArray)
      return applicantsArray.some(
        (applicant) => applicant.applicant.id === targetId
      );
  }
  return (
    <>
      <section className="mt-10">
        <button onClick={() => navigate(-1)}>Go back</button>
        <div className="max-w-xl mt-5">
          <h3 className="text-xl font-medium mb-2">{data.title}</h3>
          <h5 className="text-base">{data.location}</h5>
          <h5 className="text-xs my-1">
            {data.timestamp && timeFormater(data.timestamp)}
          </h5>
          <h5 className="text-xs">
            No. of Applicants : {data?.applicants?.length}
          </h5>
          <p className="text-base mt-3 mb-10">{data.description}</p>
          {user.exp.college ? (
            <button
              onClick={handleApply}
              disabled={hasApplicantWithId(data?.applicants, user.id)}
              className="bg-purple-700 px-3 py-1 rounded-md disabled:bg-opacity-30 disabled:cursor-not-allowed"
            >
              {hasApplicantWithId(data?.applicants, user.id)
                ? "Applied"
                : "Apply"}
            </button>
          ) : (
            <p className="font-medium text-purple-400">
              Please fill up your <Link className="underline underline-offset-4 font-semibold text-purple-600" to={'/profile'}>Profile</Link> to Apply
            </p>
          )}
        </div>
      </section>
    </>
  );
}

export default JobBoard;
