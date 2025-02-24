import { FaBarsProgress } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router";
import { Typography } from "antd";
import { Menu } from "./ui/Menu";
import { logout, selectUser } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/store/hook";

export const Navbar = ({
	setCollapsed,
	collapsed,
}: {
	setCollapsed: (data: boolean) => void;
	collapsed: boolean;
}) => {
	const user = useAppSelector(selectUser);

	console.log(user);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logout());
		setTimeout(() => {
			navigate("/login");
		}, 1000);
		toast.success("Logout successful");
	};

	const navList = (
		<ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 ">
			<Typography className="p-1 font-normal">
				<NavLink
					to={"/"}
					className={({ isActive }) =>
						isActive
							? "!flex !items-center !text-lg !text-[#6dc234] !border-b !py-1 !px-4 !border-[#6dc234] !hover:scale-95 !hover:duration-300 !duration-300 !font-medium"
							: "!flex !items-center !text-lg !text-[#222121] !hover:text-[#6dc234] !hover:text-xl !hover:duration-300 !duration-300 !font-bold"
					}
				>
					Home
				</NavLink>
			</Typography>

			<Typography className="p-1 font-normal">
				<NavLink
					to={"/about"}
					className={({ isActive }) =>
						isActive
							? "!flex !items-center !text-lg !text-[#6dc234] !border-b !py-1 !px-4 !border-[unded-lg !hover:scale-95 !hover:duration-300 !duration-300 !font-medium"
							: "!flex !items-center !text-lg !text-[#222121] !hover:text-[#6dc234] !hover:text-xl !hover:duration-300 !duration-300 !font-bold"
					}
				>
					About Us
				</NavLink>
			</Typography>

			<Typography className="p-1 font-normal">
				<NavLink
					to={"/shop"}
					className={({ isActive }) =>
						isActive
							? "!flex !items-center !text-lg !text-[#6dc234] !border-b !py-1 !px-4 !border-[rounded-lg !hover:scale-95 !hover:duration-300 !duration-300 !font-medium"
							: "!flex !items-center !text-lg !text-[#222121] !hover:text-[#6dc234] !hover:text-xl !hover:duration-300 !duration-300 !font-bold"
					}
				>
					Shop
				</NavLink>
			</Typography>
		</ul>
	);

	return (
		<>
			<nav className="bg-white border-gray-200">
				<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
					<div className=" flex items-center gap-3 ">
						{collapsed ? (
							<FaBarsProgress
								className=" text-xl"
								onClick={() => setCollapsed(!collapsed)}
							/>
						) : (
							<RxCrossCircled
								className=" text-xl"
								onClick={() => setCollapsed(!collapsed)}
							/>
						)}

						<p className="self-center text-2xl font-semibold whitespace-nowrap">
							Ride
						</p>
					</div>

					<div className="flex items-center justify-center gap-4 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
						{user ? (
							<>
								<Menu />
								<button
									className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-6 py-2.5 text-center me-2 mb-2 cursor-pointer "
									onClick={handleLogout}
								>
									Logout
								</button>
							</>
						) : (
							<Link to="/login">
								<button className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-6 py-2.5 text-center me-2 mb-2 cursor-pointer ">
									Login
								</button>
							</Link>
						)}
					</div>
					<div
						className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
						id="navbar-user"
					>
						{navList}
					</div>
				</div>
			</nav>
		</>
	);
};
