import { FormEvent } from "react";
import { useAppSelector } from "../../../redux/store/hook";
import { useChangePasswordMutation } from "../../../redux/features/auth/authApi";
import { selectUser } from "../../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Button from "../../../components/ui/shared/Button";

const Settings = () => {
	const currentUser = useAppSelector(selectUser);
	const [changePassword] = useChangePasswordMutation();
	const handlePasswordChange = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const currentPassword = (form as HTMLFormElement).currentPassword.value;
		const newPassword = (form as HTMLFormElement).newPassword.value;
		const payload = {
			currentPassword,
			newPassword,
		};
		try {
			const response = await changePassword(payload).unwrap();
			if (response?.success) {
				form.reset();
				console.log(response);
				toast.success("Password Changed Successfully");
			} else {
				form.reset();
				console.log(response);
				toast.error(response?.data?.message);
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			form.reset();
			toast.error(error?.data?.message || "Something went wrong");
			console.error("Error submitting", error);
		}
	};
	return (
		<form onSubmit={handlePasswordChange} className="mx-auto mb-0 space-y-4">
			<div>
				<div className="relative">
					<label className="text-sm">Current Email</label>
					<input
						disabled
						placeholder="Current Email"
						className="w-full bg-slate-200 text-gray-500 rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mt-2"
						type="email"
						value={currentUser?.email}
						data-temp-mail-org="0"
					/>
				</div>
				<div className="relative mt-2">
					<label className="text-sm">Current Password</label>
					<input
						placeholder="Current Password"
						className="w-full bg-slate-200 rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mt-2"
						name="currentPassword"
						type="password"
						required
					/>
				</div>
			</div>
			<div>
				<div className="relative">
					<label className="text-sm">New Password</label>
					<input
						placeholder="New Password"
						className="w-full bg-slate-200 rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mt-2"
						name="newPassword"
						type="password"
						required
					/>
				</div>
			</div>

			<div className="flex flex-col gap-5 items-center justify-between">
				<Button text="Change Password" isFullWidth={true} />
			</div>
		</form>
	);
};

export default Settings;
