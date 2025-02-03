import { Dashboard } from "../pages/Dashboard/adminDashboard/Dashboard";
import { Product } from "../pages/Dashboard/adminDashboard/Product";
import { Users } from "../pages/Dashboard/adminDashboard/Users";

export const adminPaths = [
	{
		name: "Dashboard",
		path: "dashboard",
		element: <Dashboard />,
	},
	{
		name: "Product Management",
		children: [
			{
				name: "Product",
				path: "all-product",
				element: <Product />,
			}
		],
	},
	{
		name: "User Management",
		children: [
			{
				name: "Users",
				path: "user",
				element: <Users />,
			}
		],
	},
	
];
