import { Form, Select } from "antd";
import React, { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
export const FormSelectWithWatch = ({
	identifier,
	options,
	placeholder,
	setInput,
	disabled,
}: {
	identifier: string;
	options: { value: string; label: string }[];
	placeholder: string;
	setInput: React.Dispatch<React.SetStateAction<string>>;
	disabled?: boolean;
}) => {
	const { control } = useFormContext();
	const watchedValue = useWatch({
		control,
		name: identifier,
	});

	useEffect(() => {
		setInput(watchedValue);
	}, [watchedValue]);

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
