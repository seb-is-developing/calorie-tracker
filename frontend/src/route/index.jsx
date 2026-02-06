import { createBrowserRouter, RouterProvider } from "react-router-dom";
import pathConfig from "./config.json";
import Home from "../pages/Home";
import SignUp from "../pages/signUp";
import LogIn from "../pages/logIn";
import Dashboard from "../pages/bodyStats/dashboard";
import ProtectedRoutes from "../components/protectedRoutes";
import Chart from "../pages/calorie-chart/Chart";
const router = createBrowserRouter([
  {
    path: pathConfig.home,
    element: <Home />,
  },
  {
    path: pathConfig.signUp,
    element: <SignUp />,
  },
  {
    path: pathConfig.login,
    element: <LogIn />,
  },
  {
    path: pathConfig.dashboard,
    element: (
      <ProtectedRoutes>
        <Dashboard />
      </ProtectedRoutes>
    ),
  },
  {
    path: pathConfig.chart,
    element: (
      <ProtectedRoutes>
        <Chart />
      </ProtectedRoutes>
    ),
  },
]);
export default function Routes() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
