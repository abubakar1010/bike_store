import MyOrders from "../pages/Dashboard/userDashboard/MyOrders";
import MyProfile from "../pages/Dashboard/userDashboard/Profile";
import VerifyOrder from "../pages/VerifyOrder";

export const userPath = [
	{
		name: "My Order",
		path: "my-order",
		element: <MyOrders />,
	},

	{
		name: "Profile",
		path: "profile",
		element: <MyProfile />,
	},
	{
		name: "",
		path: "verify-order",
		element: <VerifyOrder />,
	},
	
];
