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

const Register = () => {
	const dispatch = useAppDispatch();
	const { Title } = Typography;

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
			<div
				className=" flex flex-col justify-center items-center gap-9 "
				style={{ height: "100vh" }}
			>
				<div>
					<Title level={5} color="gray" className="mt-1 font-normal">
						Please Enter your details to register.
					</Title>
				</div>
				<FormContainer onSubmit={onSubmit} defaultValues={defaultValue}>
					<FormInput
						type="text"
						identifier="your name"
						placeholder="Enter your Name"
					/>
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
						className="mt-6 bg-gradient-to-r from-[#6dc234] to-[#6dc234ad] w-full py-3 rounded-lg font-bold text-white text-xl cursor-pointer"
					>
						Sign Up
					</button>
					<Typography color="gray" className="!mt-4 !text-center !font-normal">
						Already have an account?{" "}
						<Link
							to={"/login"}
							className="!font-medium !text-[#ff5d64ed] !hover:underline "
						>
							Sign In
						</Link>
					</Typography>
				</FormContainer>
			</div>
		</>
	);
};

export default Register;
