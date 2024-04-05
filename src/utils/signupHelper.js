import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

export default async function signupHelper(
  username,
  email,
  password,
  userType
) {
  try {
    const existingUserResponse = await fetch(
      `http://localhost:3001/users?email=${email}`
    );
    const existingUser = await existingUserResponse.json();

    if (existingUser.length > 0) {
      toast.error(`Email ${email} is already registered.`);
      return {
        success: false,
        message: `Email ${email} is already registered.`,
      };
    }
    const bodyData = {
      id: uuidv4(),
      username: username,
      email: email,
      password: password,
      roles: [userType],
    };

    // Add the jobsApplied field if userType is 'applicant'
    if (userType === "applicant") {
      bodyData.jobsApplied = [];
      bodyData.exp = {
        college: "",
        totalExp: "",
        currentTitle: "",
      };
    }
    const response = await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

    if (response.ok) {
      return {
        success: true,
        message: "User created successfully",
      };
    } else {
      const errorMessage = await response.text();
      toast.error(`Error: ${errorMessage}`);
      return {
        success: false,
        message: `Error: ${errorMessage}`,
      };
    }
  } catch (error) {
    toast.error(`An error occurred while processing your request`);
    return {
      success: false,
      message: "An error occurred while processing your request",
    };
  }
}
