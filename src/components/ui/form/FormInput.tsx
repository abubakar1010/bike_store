import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

export const FormInput = ({
	type,
	identifier,
	placeholder,
}: {
	type: string;
	identifier: string;
	placeholder: string;
}) => {
	const label = identifier.includes(".")? identifier.split(".")[1].toLocaleUpperCase() : identifier.toLocaleUpperCase()
	return (
		<div style={{ marginBottom: "10px" }}>
			<Controller
				name={identifier}
				render={({ field, fieldState: {error} }) => (
					<Form.Item label={label}>
						<Input {...field} size="large" type={type} placeholder={placeholder} />
						{error && <small style={{color: "red"}}>{error.message}</small>}
					</Form.Item>
				)}
			/>
		</div>
	);
};
