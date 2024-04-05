import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

export async function postJob({ formData }) {
  try {
    const response = await fetch("http://localhost:3001/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: uuidv4(),
        ...formData,
        applicants: [],
        timestamp: new Date().toISOString(),
      }),
    });
    const data = await response.json();
    toast.success("Job Posted");
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    toast.error("Error applying for job");
    return {
      success: false,
    };
  }
}
