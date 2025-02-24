/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "antd";
import { ReactNode } from "react";
import {
	FieldValues,
	FormProvider,
	SubmitHandler,
	useForm,
} from "react-hook-form";

type TFormConfig = {
	defaultValues?: Record<string, unknown>;
	resolver?: any;
};

type TFormProps = {
	onSubmit: SubmitHandler<FieldValues>;
	children: ReactNode;
	admin?: boolean;
} & TFormConfig;

export const FormContainer = ({
	onSubmit,
	children,
	defaultValues,
	resolver,
	admin = false,
}: TFormProps) => {
	const formConfig: TFormConfig = {};

	if (defaultValues) {
		formConfig["defaultValues"] = defaultValues;
	}
	if (resolver) {
		formConfig["resolver"] = resolver;
	}

	const methods = useForm(formConfig);
	return (
		<>
			{admin ? (
				<FormProvider {...methods}>
					<Form
						layout="vertical"
						variant={"filled"}
						onFinish={methods.handleSubmit(onSubmit)}
						className=" w-full"
					>
						{children}
					</Form>
				</FormProvider>
			) : (
				<FormProvider {...methods}>
					<Form
						layout="vertical"
						variant={"filled"}
						onFinish={methods.handleSubmit(onSubmit)}
						className=" w-[400px]"
					>
						{children}
					</Form>
				</FormProvider>
			)}
		</>
	);
};
