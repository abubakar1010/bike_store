/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography } from "antd";
import { FieldValues } from "react-hook-form";
import { useCreateUserMutation } from "../redux/features/auth/authApi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FormContainer } from "../components/ui/form/FormContainer";
import { FormInput } from "../components/ui/form/FormInput";

const Register = () => {
	const { Title } = Typography;

	const [createUser] = useCreateUserMutation();

	const navigate = useNavigate();

	const onSubmit = async (data: FieldValues) => {
		try {
			const credential = {
				name: data.name,
				email: data.email,
				password: data.password,
			};
			const res = await createUser(credential).unwrap();

			toast.success(`${res.message}`);
			navigate(`/login`);
		} catch (err: any) {
			console.log(err)
			toast.error(`${err.data.message}`);
		}
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
				<FormContainer onSubmit={onSubmit} >
					<FormInput
						type="text"
						identifier="name"
						placeholder="Enter your Name"
					/>
					<FormInput
						type="text"
						identifier="email"
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
