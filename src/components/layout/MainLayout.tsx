import { Button, Layout } from "antd";
import { FC, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "../ui/Sidebar";
import { logout } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/store/hook";
import { toast, ToastContainer } from "react-toastify";
import { useBoomMutation } from "../../redux/features/auth/authApi";

const { Header, Content, Footer } = Layout;

export const MainLayout: FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const handleLogout = () => {
		dispatch(logout());
		setTimeout(() => {
			navigate("/login");
		}, 1000);
		toast.success("Logout successful");
	};

	const [blast] = useBoomMutation();

	useEffect(() => {
		blast(undefined);
	}, []);
	return (
		<>
			<Layout style={{ minHeight: "100%" }}>
				<Sidebar />
				<Layout>
					<Header style={{ textAlign: "right", position: "sticky", top: "0" }}>
						<Button onClick={handleLogout}>Logout</Button>
					</Header>
					<Content style={{ margin: "24px 16px 0" }}>
						<div
							style={{
								padding: 24,
								minHeight: "",
							}}
						>
							<Outlet />
						</div>
					</Content>
					<Footer style={{ textAlign: "center" }}>
						Ant Design ©{new Date().getFullYear()} Created by Ant UED
					</Footer>
				</Layout>
			</Layout>
			<ToastContainer />
		</>
	);
};
