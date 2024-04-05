import { toast } from "react-toastify";
import axios from "axios";

export async function updateProfile({ user, exp }) {
  try {
    await axios.patch(`http://localhost:3001/users/${user.id}`, {
      username: exp.username,
      exp: {
        college: exp.college,
        totalExp: exp.totalExp,
        currentTitle: exp.currentTitle,
      },
    });
    toast.success("Updated Profile");
    return {
      success: true,
    };
  } catch (error) {
    toast.error("Error Updating Profile");
    return {
      success: false,
    };
  }
}
