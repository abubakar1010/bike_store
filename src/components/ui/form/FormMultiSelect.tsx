import { Form, Select } from "antd";
import type { SelectProps } from "antd";
import { Controller } from "react-hook-form";

const options: SelectProps["options"] = [];

for (let i = 10; i < 36; i++) {
	options.push({
		label: i.toString(36) + i,
		value: i.toString(36) + i,
	});
}

export const FormMultiSelectSelect = ({
	identifier,
	options,
	placeholder,
}: {
	identifier: string;
	options: { value: string; label: string }[];
	placeholder: string;
}) => {
	return (
		<div>
			<Controller
				name={identifier}
				render={({ field, fieldState: { error } }) => (
					<Form.Item label={identifier}>
						<Select
							{...field}
							mode="multiple"
							allowClear
							style={{ width: "100%" }}
							placeholder={placeholder}
							options={options}
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
