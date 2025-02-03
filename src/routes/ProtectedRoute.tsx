import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store/hook";
import { logout, selectToken } from "../redux/features/auth/authSlice";
import { decodeToken } from "../utils/DecodeToken";

export const ProtectedRoute = ({
	children,
	role,
}: {
	children: ReactNode;
	role: string | undefined;
}) => {
	console.log(role);
	const token = useAppSelector(selectToken);
	const dispatch = useAppDispatch();

	let user;

	if (token) user = decodeToken(token);

	if (role !== undefined && role !== user?.role) {
		dispatch(logout());
	}

	if (!token) return <Navigate to={"/login"} replace />;

	return children;
};
