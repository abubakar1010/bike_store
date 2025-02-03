import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Home } from "../pages/Home";
import { ChangePassword } from "../components/ui/ChangePassword";
import { routesGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./AdminRoutes";
import { ProtectedRoute } from "./ProtectedRoute";
import { userPath } from "./UserRoutes";
import Login from "../pages/Login";

export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            children: [
                {
                    index: true,
                    element: <Home />
                }
            ]
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/change-password",
            element: <ChangePassword />
        },
        {
            path: "/admin",
            element: <ProtectedRoute role="admin">
                <App />
            </ProtectedRoute>,
            children: routesGenerator(adminPaths)
        },
        {
            path: "/student",
            element: <ProtectedRoute role="user">
                <App />
            </ProtectedRoute>,
            children: routesGenerator(userPath)
        }
    ]
)