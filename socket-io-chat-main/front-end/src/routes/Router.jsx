import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/common/Home";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import NotFound from "../pages/errors/NotFound";
import {
  REGISTER_ROUTE,
  LOGIN_ROUTE,
  CONTACT_ROUTE,
  ABOUT_ROUTE,
  CHAT_ROUTE,
  UNAUTHORIZED_ROUTE,
} from "./Routes";
import GlobalLayout from "../layouts/GlobalLayout";
import Contact from "../pages/common/Contact";
import About from "../pages/common/About";
import Chat from "../pages/Chat";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Unauthorized from "../pages/errors/unauthorized";
import ChatLayout from "../layouts/ChatLayout";

export const router = createBrowserRouter([
  {
    element: <GlobalLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: REGISTER_ROUTE,
        element: <Register />,
      },
      {
        path: LOGIN_ROUTE,
        element: <Login />,
      },
      {
        path: CONTACT_ROUTE,
        element: <Contact />,
      },
      {
        path: ABOUT_ROUTE,
        element: <About />,
      },
    ],
  },
  {
    element: <ChatLayout />,
    children: [
      {
        path: CHAT_ROUTE,
        element: (
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: UNAUTHORIZED_ROUTE,
    element: <Unauthorized />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
