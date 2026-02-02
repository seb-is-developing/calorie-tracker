import { createBrowserRouter, RouterProvider } from "react-router-dom";
import pathConfig from "./config.json";
import Home from "../pages/Home";
import SignUp from "../pages/signUp";
const router = createBrowserRouter([
  {
    path: pathConfig.home,
    element: <Home />,
  },
  {
    path: pathConfig.signUp,
    element: <SignUp />,
  },
]);
export default function Routes() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
