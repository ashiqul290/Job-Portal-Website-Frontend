import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Home from "../pages/Home";
import Jobs from "../pages/Jobs";
import JobDetails from "../pages/JobDetails";
import Companies from "../pages/Companies";
import CompanyDetails from "../pages/CompanyDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import Dashboard from "../pages/Dashboard";
import SavedJobs from "../pages/SavedJobs";
import AppliedJobs from "../pages/AppliedJobs";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";
import Notifications from "../pages/Notifications";
import Contact from "../pages/Contact";
import About from "../pages/About";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "jobs", Component: Jobs },
      { path: "jobs/:id", Component: JobDetails },
      { path: "companies", Component: Companies },
      { path: "companies/:id", Component: CompanyDetails },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "applied-jobs", Component: AppliedJobs },
      { path: "saved-jobs", Component: SavedJobs },
      { path: "profile", Component: Profile },
      { path: "edit-profile", Component: EditProfile },
      { path: "notifications", Component: Notifications },
    ],
  },
  { path: "/login", Component: Login },
  { path: "/register", Component: Register },
  { path: "/forgot-password", Component: ForgotPassword },
  { path: "*", Component: NotFound },
]);
