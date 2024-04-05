import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/applicant/Home";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import JobBoard from "./pages/applicant/JobBoard";
import RequireAuth from "./utils/RequireAuth";
import FillerPage from "./pages/FillerPage";
import Signup from "./pages/Signup";
import JobsApplied from "./pages/applicant/JobsApplied";
import JobsPosted from "./pages/recruiter/JobsPosted";
import ViewJob from "./pages/recruiter/ViewJob";
import ApplicantProfile from "./pages/recruiter/ApplicantProfile";
import Profile from "./pages/applicant/Profile";

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout user={user} />}>
            <Route path="/" element={<Home user={user} />} />

            {/* protected routes for applicant */}
            <Route
              element={<RequireAuth allowedRole={["applicant"]} user={user} />}
            >
              <Route path="/profile*" element={<Profile />} />
              <Route path="/jobs/:slug" element={<JobBoard user={user} />} />
              <Route path="/jobs-applied" element={<JobsApplied />} />
            </Route>


            {/* protected routes for recruiter */}
            <Route
              element={<RequireAuth allowedRole={["recruiter"]} user={user} />}
            >
              <Route
                path="/applicant-profile/:slug"
                element={<ApplicantProfile />}
              />
              <Route path="/jobs-posted" element={<JobsPosted user={user} />} />
              <Route
                path="/jobs-posted/:slug"
                element={<ViewJob user={user} />}
              />
            </Route>

            {/* public pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route exact path="*" element={<FillerPage />} />
            <Route
              exact
              path="/unauthorized"
              element={<FillerPage type="unauthorized" />}
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
