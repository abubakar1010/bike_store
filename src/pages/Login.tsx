import { Typography } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { setUser, TUSer } from "../redux/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/store/hook";
import { toast } from "react-toastify";
import { decodeToken } from "../utils/DecodeToken";
import { FormContainer } from "../components/ui/form/FormContainer";
import { FormInput } from "../components/ui/form/FormInput";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";

const Login = () => {
	const dispatch = useAppDispatch();

	const [login] = useLoginMutation();

	const navigate = useNavigate();

	const onSubmit = async (data: FieldValues) => {
		try {
			const credential = {
				email: data.email,
				password: data.password,
			};
			const res = await login(credential).unwrap();

			const user = decodeToken(res.data.accessToken) as TUSer;

			dispatch(setUser({ user, token: res.data.accessToken }));
			toast.success("User login successful");
			navigate(`/${user.role}/dashboard`);
		} catch (err: unknown) {
			toast.error(`Oops!Something went wrong.${err}`);
		}
	};

	const defaultValue = {
		email: "rayhan@gmail.com",
		password: "987654321",
	};

	return (
		<>
			
			<div className=" flex flex-col justify-center items-center gap-9 " style={{ height: "100vh" }}>
			<h1 className=" text-center  text-2xl">
				Enter your email and password to continue
			</h1>
				<FormContainer onSubmit={onSubmit} defaultValues={defaultValue}>
					<FormInput
						type="text"
						identifier="your email"
						placeholder="Enter your Email"
					/>

					<FormInput
						type="text"
						identifier="password"
						placeholder="Enter your Password"
					/>

					<button
						type="submit"
						className="mt-6 bg-gradient-to-r from-[#6dc234] to-[#6dc234ad] w-full py-3 rounded-lg font-bold text-white text-xl"
					>
						sign In
					</button>
					<Typography color="gray" className="!mt-4 !text-center !font-normal">
						{`Don't have an account`}?{" "}
						<Link
							to={"/register"}
							className="!font-medium !text-[#ff5d64ed] !hover:underline"
						>
							Create an account
						</Link>
					</Typography>
					<div className="inline-flex items-center justify-center w-full mt-2">
						<hr className="w-full h-px my-8 bg-[#AAAAAA] border-0 " />
						<span className="absolute px-3 font-medium text-xl -translate-x-1/2 bg-white left-1/2 ">
							or
						</span>
					</div>

					<div className=" flex gap-4 border-2 border-[#4c4a4aae] items-center py-3 rounded-full justify-center cursor-pointer">
						<FcGoogle className=" text-3xl" />
						<p className=" text-lg font-medium text-[#151515ca]">
							Continue with Google
						</p>
					</div>
					<div className=" cursor-pointer flex gap-4 border-2 border-[#4c4a4aae] items-center py-3 rounded-full justify-center mt-6">
						<FaGithub className=" text-3xl" />
						<p className=" text-lg font-medium text-[#151515ca]">
							Continue with GitHub
						</p>
					</div>
				</FormContainer>
			</div>
		</>
	);
};

export default Login;
