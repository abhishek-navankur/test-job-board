import { toast } from "react-toastify";
import axios from "axios";

export async function applyForJob({ user, applicationData }) {
  try {
    await axios.patch(`http://localhost:3001/jobs/${applicationData.id}`, {
      applicants: [
        ...applicationData.applicants,
        { applicant: { id: user.id, username: user.username } },
      ],
    });

    await axios.patch(`http://localhost:3001/users/${user.id}`, {
      jobsApplied: [
        ...user.jobsApplied,
        {
          id: applicationData.id,
          title: applicationData.title,
          description: applicationData.description,
          location: applicationData.location,
        },
      ],
    });
    toast.success("Applied");
    return {
      success: true,
    };
  } catch (error) {
    toast.error("Error applying for job");
    return {
      success: false,
    };
  }
}
