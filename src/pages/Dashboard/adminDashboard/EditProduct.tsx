/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetSingleProductQuery, useUpdateProductMutation } from "../../../redux/features/product/productApi";
import Loading from "../../../components/ui/Loading";
import { toast } from "react-toastify";
import { brands, categories, models } from "../../../constant/product.constant";
import { FormContainer } from "../../../components/ui/form/FormContainer";
import { FormSelect } from "../../../components/ui/form/FormSelect";
import { FormInput } from "../../../components/ui/form/FormInput";
import FormTextArea from "../../../components/ui/form/FormTextArea";
import Button from "../../../components/ui/shared/Button";

const validationSchema = z.object({
	brand: z.string().optional(),
	model: z.string().optional(),
	image: z.instanceof(File).optional(),
	year: z
		.number()
		.min(2018, "Year must be 2018 or later")
		.max(2024, "Year must be 2024 or earlier")
		.optional(),
	price: z
		.preprocess(
			(val) => Number(val),
			z.number().min(0, "Price must be a positive number").optional()
		)
		.optional(),
	category: z.string().optional(),
	quantity: z
		.preprocess(
			(val) => Number(val),
			z.number().min(1, "Quantity must be at least 1").optional()
		)
		.optional(),
	description: z.string().optional(),
});

const EditProduct = () => {
	const { id } = useParams();
	const { data: response, isLoading, isError } = useGetSingleProductQuery(id);
	const [updateProduct] = useUpdateProductMutation();
	const navigate = useNavigate();

	console.log(response)

	// Loading state
	if (isLoading) {
		return <Loading />;
	}

	// Error state
	if (isError || !response) {
		return (
			<h3 className="text-main font-bold text-2xl flex items-center justify-center h-screen">
				Something went wrong. Please refresh and try again.
			</h3>
		);
	}

	// product data from the response
	const product = response?.data;

	console.log(product);

	if (!product) {
		return (
			<h3 className="text-main font-bold text-2xl flex items-center justify-center h-screen">
				product not found!
			</h3>
		);
	}

	// submit update
	const handleSubmit = async (formData: any, reset: any) => {

		const formDataToSend = new FormData();
		formDataToSend.append(
			"data",
			JSON.stringify({ ...formData, inStock: formData.quantity > 0 })
		);

		try {
			const res = await updateProduct({
				id: id,
				formData: formDataToSend,
			}).unwrap();
			console.log(res);
			if (res?.success) {
				reset();
				toast.success(`${res?.data.message}`);
				navigate("/dashboard/product-management");
			}
		} catch (error: any) {
			toast.error(`${error?.data?.message}`)
			reset();
		}
	};

	const brandOptions = brands?.map((brand) => ({
		label: brand,
		value: brand,
	}));
	const modelOptions = models?.map((brand) => ({
		label: brand,
		value: brand,
	}));
	const categoryOptions = categories?.map((brand) => ({
		label: brand,
		value: brand,
	}));

	return (
		<div>
			<FormContainer
				onSubmit={handleSubmit}
				resolver={zodResolver(validationSchema)}
				admin={true}
				// defaultValues={product}
			>
				<div className="space-y-4">
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<FormSelect
							placeholder="Select Brand"
							options={brandOptions}
							identifier={"brand"}
						/>
						<FormSelect
							placeholder="Select Model"
							options={modelOptions}
							identifier={"model"}
						/>
						
					</div>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<FormInput
							identifier={"price"}
							type="number"
                            placeholder="Number"
						/>
						<FormInput
							identifier={"quantity"}
							placeholder="Quantity"
							type="number"
						/>
					</div>
					{/* <FormUpload
						name="image"
						label="Upload Image"
					/> */}
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<FormSelect
							placeholder="Select Category"
							options={categoryOptions}
							identifier={"category"}
						/>
						<FormSelect
							placeholder="Year Released"
							options={[
								{ label: 2018, value: 2018 },
								{ label: 2019, value: 2019 },
								{ label: 2020, value: 2020 },
								{ label: 2021, value: 2021 },
								{ label: 2022, value: 2022 },
								{ label: 2023, value: 2023 },
								{ label: 2024, value: 2024 },
							]}
							identifier={"year"}
						/>
					</div>
					<FormTextArea
						value={product?.description}
						name={"description"}
						label="Description"
					/>
				</div>

				<div className="flex justify-start gap-4">
					<Button text="Update" type="submit" />
				</div>
			</FormContainer>
		</div>
	);
};

export default EditProduct;
