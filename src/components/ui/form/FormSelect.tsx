import { Form, Select } from "antd";
import { Controller } from "react-hook-form";
export const FormSelect = ({
	identifier,
	options,
	placeholder,
	disabled,
}: {
	identifier: string;
	options: { value: string | number; label: string | number }[];
	placeholder: string;
	disabled?: boolean;
}) => {
	return (
		<div>
			<Controller
				name={identifier}
				render={({ field, fieldState: { error } }) => (
					<Form.Item label={identifier}>
						<Select
							{...field}
							placeholder={placeholder}
							style={{ width: "100%" }}
							options={options}
							size="large"
							disabled={disabled}
							onFocus={(e) => {
								e.target.style.outline = "none";
								e.target.style.border = "2px solid green";
							}}
						/>
						{error && <small style={{ color: "red" }}>{error.message}</small>}
					</Form.Item>
				)}
			/>
		</div>
	);
};
