import { toast } from "react-toastify";

export default async function loginHelper(email, password) {
  try {
    const res = await fetch("http://localhost:3001/users");
    const users = await res.json();

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      toast.success(`Welcome ${user.username}!`);
      return { success: true, user };
    } else {
      toast.error(`Invalid email or password`);
      return { success: false, message: "Invalid email or password" };
    }
  } catch (error) {
    toast.error(`An error occurred while processing your request`);
    return {
      success: false,
      message: "An error occurred while processing your request",
    };
  }
}
