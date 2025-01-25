import { JSX } from "react";
import { webRoutes } from "./web";
import Login from "~/pages/login/login";
import Redirect from "./redirect";
import AuthLayout from "~/components/authLayout";
import RequiredRoute from "./requiredRoute";
import { createBrowserRouter, Outlet } from "react-router-dom";
import RegisterPage from "~/pages/register/register";
import ChatPage from "~/pages/chatPage/ChatPage";
import RoadMap from "~/pages/roadMapPage/RoadMapPage";

export interface AppRoute {
  path?: string;
  element: JSX.Element;
  errorElement?: JSX.Element;
  children?: AppRoute[];
}

const errorElement = (
  <div className="flex items-center justify-center h-screen">
    Sorry, something went wrong
  </div>
);

const appRoutes: AppRoute[] = [
  // Public Routes
  {
    path: webRoutes.redirect,
    element: <Redirect />,
    errorElement: errorElement,
  },

  // Auth Routes
  {
    element: <AuthLayout />,
    errorElement: errorElement,
    children: [
      {
        path: webRoutes.login,
        element: <Login />,
      },
      {
        path: webRoutes.register,
        element: <RegisterPage />,
      },
    ],
    path: "",
  },

  // Protected Routes
  {
    element: (
      <RequiredRoute>
        <Outlet/>
      </RequiredRoute>
    ),
    errorElement: errorElement,
    children: [
      {
        path: webRoutes.home,
        element: <RoadMap />,
      },
    ],
  },

  // Catch-All Route (Not Found Page)
  {
    path: "*",
    element: <div>NotFoundPage</div>,
    errorElement: errorElement,
  },
];

// Pass appRoutes to createBrowserRouter to create the router
const router = createBrowserRouter(appRoutes);

export default router;
