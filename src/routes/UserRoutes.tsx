import { Dashboard } from "../pages/Dashboard/userDashboard/Dashboard";
import { Orders } from "../pages/Dashboard/userDashboard/Orders";


export const userPath = [
    {
        name: "Dashboard",
        path: "dashboard",
        element: <Dashboard />,
    },
    {
        name: "Orders",
        path: "order",
        element: <Orders />,
    },
    
];