import { createBrowserRouter, RouterProvider } from "react-router-dom";
import pathConfig from "./config.json";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: pathConfig.home,
    element: <Home />,
  },
]);
export default function Routes() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
