import AddProduct from "../pages/Dashboard/adminDashboard/AddProductPage";
import EditProduct from "../pages/Dashboard/adminDashboard/EditProduct";
import OrdersManagement from "../pages/Dashboard/adminDashboard/OrderManagement";
import ProductManagement from "../pages/Dashboard/adminDashboard/ProductManagement";
import UserManagement from "../pages/Dashboard/adminDashboard/UserManagement";
import Dashboard from "../pages/Dashboard/userDashboard/Dashboard";
import MyOrders from "../pages/Dashboard/userDashboard/MyOrders";
import MyProfile from "../pages/Dashboard/userDashboard/Profile";

export const adminPaths = [
	{
        name: "Dashboard",
        path: "dashboard",
        element: <Dashboard />,
    },
	{
		name: "manage product",
		path: "manage-product",
		element: <ProductManagement />,
	},
	{
		name: "add product",
		path: "add-product",
		element: <AddProduct />,
	},
	{
		name: "user management",
		path: "manage-user",
		element: <UserManagement />,
	},
	{
		name: "Order Management",
		path: "order-management",
		element: <OrdersManagement />,
	},
	{
		name: "",
		path: "edit-product/:id",
		element: <EditProduct />,
	},
	{
		name: "My Order",
		path: "my-order",
		element: <MyOrders />,
	},

	{
		name: "Profile",
		path: "profile",
		element: <MyProfile />,
	}
];
