import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Home } from "../pages/Home";
import { routesGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./AdminRoutes";
import { ProtectedRoute } from "./ProtectedRoute";
import { userPath } from "./UserRoutes";
import Login from "../pages/Login";
import Register from "../pages/Register";
import About from "../pages/About";
import Shop from "../pages/Shop/Shop";
import ProductDetails from "../pages/ProductDetail";
import CheckoutPage from "../components/Checkout";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "/about",
				element: <About />,
			},
			{
				path: "/shop",
				element: <Shop />,
			},
			{
				path: "/checkout",
				element: <CheckoutPage />,
			},
			{
				path: "/product/:id",
				element: <ProductDetails />,
			},
		],
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/register",
		element: <Register />,
	},
	{
		path: "/admin",
		element: (
			<ProtectedRoute role="admin">
				<App />
			</ProtectedRoute>
		),
		children: routesGenerator(adminPaths),
	},
	{
		path: "/customer",
		element: (
			<ProtectedRoute role="customer">
				<App />
			</ProtectedRoute>
		),
		children: routesGenerator(userPath),
	},
]);
