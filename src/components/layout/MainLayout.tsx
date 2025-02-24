import { Layout } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar";
import { Sidebar } from "../Sidebar";


const { Content } = Layout;

export const MainLayout = () => {
	const [collapsed, setCollapsed] = useState(true);


	return (
		<>
			<Layout className=" !min-h-screen">
					
					<Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
				<Layout>
					
					<Sidebar collapsed={collapsed} />
					<Layout style={{ padding: "0 24px 24px" }}>
						
						<Content
							style={{
								padding: 24,
								margin: 0,
								minHeight: 280,
							}}
						>
							<Outlet />
						</Content>
					</Layout>
				</Layout>
			</Layout>
		</>
	);
};
