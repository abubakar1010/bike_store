import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useAppSelector } from "../redux/store/hook";
import { selectToken } from "../redux/features/auth/authSlice";
import { decodeToken } from "../utils/DecodeToken";
import { sidebarItemsGenerator } from "../utils/sidebarItemGenerators";
import { adminPaths } from "../routes/AdminRoutes";
import { userPath } from "../routes/UserRoutes";



export const Sidebar = ({collapsed}: {collapsed: boolean}) => {

	const token = useAppSelector(selectToken)

	let user;
	if(token){
		user = decodeToken(token)
	}

	let sidebarItem;

	switch (user?.role) {
		case "admin":
			sidebarItem = sidebarItemsGenerator(adminPaths, "admin")
			break;
		case "customer":
			sidebarItem = sidebarItemsGenerator(userPath, "customer")
			break;
	
		default:
			sidebarItem =[{key: "Dashboard", label: "Dashboard" }]
			break;
	}

	return (
		<>
			<Sider
			trigger={null} collapsible defaultCollapsed={collapsed} collapsed={collapsed}
				breakpoint="lg"
				collapsedWidth="0"
				style={{height: "100vh", position: "sticky", top: "0"}}
			>
				<div className="demo-logo-vertical" />
				<h1
					style={{
						textAlign: "center",
						color: "white",
						margin: "10px 0",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					UMS
				</h1>
				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={["4"]}
					items={sidebarItem}
				/>
			</Sider>
		</>
	);
};
