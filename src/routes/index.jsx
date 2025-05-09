import { createBrowserRouter } from "react-router";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { routeSources } from "./source.routes";
import { routesGenerator } from "../utils/routesGenerator";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // Children array component will use mainlayout
    children: routesGenerator(routeSources),
  },
  // Login, register and other component will render different layout. Because they don't children of App component.
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register", // This is an absolute path
    element: <Register />,
  },
]);

export default router;
