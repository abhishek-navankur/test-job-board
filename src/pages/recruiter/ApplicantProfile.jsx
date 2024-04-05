import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ApplicantProfile() {
  const { slug } = useParams();
  let initialData = {
    username: "",
    email: "",
  };
  const [data, setData] = React.useState(initialData);

  const navigate = useNavigate();

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${slug}`);
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
        <h3 className="text-xl font-medium mb-2">{data.username}</h3>
        <a href={`mailto:${data.email}`} className="text-base underline text-purple-500 underline-offset-4 my-3">
          {data.email}
        </a>
        <p className="mt-2">College Attended : {data?.exp?.college}</p>
        <p>Current Title : {data?.exp?.currentTitle}</p>
        <p>YOE : {data?.exp?.totalExp}</p>
      </div>
    </section>
  );
}
