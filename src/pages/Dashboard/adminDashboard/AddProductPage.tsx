/* eslint-disable @typescript-eslint/no-explicit-any */

import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAddProductMutation } from "../../../redux/features/product/productApi";
import { toast } from "react-toastify";
import { FormContainer } from "../../../components/ui/form/FormContainer";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSelect } from "../../../components/ui/form/FormSelect";
import { FormInput } from "../../../components/ui/form/FormInput";
import FormUpload from "../../../components/ui/form/FormUpload";
import MyFormTextArea from "../../../components/ui/form/FormTextArea";
import Button from "../../../components/ui/shared/Button";
import { brands, categories, models } from "../../../constant/product.constant";


const validationSchema = z.object({
	brand: z.string().nonempty("Brand is required"),
	model: z.string().nonempty("Model is required"),
	image: z.instanceof(File).optional(),
	year: z
		.number()
		.min(2018, "Year must be 2018 or later")
		.max(2024, "Year must be 2024 or earlier"),
	price: z.preprocess(
		(val) => Number(val),
		z.number().min(0, "Price must be a positive number")
	),
	category: z.string().nonempty("Category is required"),
	quantity: z.preprocess(
		(val) => Number(val),
		z.number().min(1, "Quantity must be at least 1")
	),
	description: z.string().nonempty("Description is required"),
});

const AddProduct = () => {
	const [showProfile, setShowProfile] = useState(true);
	const [addProduct] = useAddProductMutation();
	const navigate = useNavigate();
	// submit update
	const handleSubmit = async (formData: any) => {

		const formDataToSend = new FormData();
		if (formData.image) {
			formDataToSend.append("image", formData.image);
			delete formData.image;
		}
		formDataToSend.append(
			"data",
			JSON.stringify({ ...formData, inStock: true })
		);

		try {
			const res = await addProduct(formDataToSend).unwrap();
			console.log(res);
			if (res.success) {
				// reset();
				toast.success(`${res?.message}`);
				navigate("/admin/manage-product");
			}
		} catch (error: any) {
			console.log(error)
			toast.error(error?.data?.message || "Something went wrong");
			// reset();
		}
	};

	const brandOptions = brands?.map((brand: any) => ({
		label: brand,
		value: brand,
	}));
	const modelOptions = models?.map((brand: any) => ({
		label: brand,
		value: brand,
	}));
	const categoryOptions = categories?.map((brand: any) => ({
		label: brand,
		value: brand,
	}));

	return (
		<div>
			<FormContainer
				onSubmit={handleSubmit}
				resolver={zodResolver(validationSchema)}
				admin={true}
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
						<FormInput identifier={"price"} placeholder="Price" type="number" />
						<FormInput identifier={"quantity"} placeholder="Quantity" type="number" />
					</div>
					<FormUpload
						setShowProfile={setShowProfile}
						showProfile={showProfile}
						name="image"
						label="Upload Image"
					/>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<FormSelect
							placeholder="Select Category"
							options={categoryOptions}
							identifier={"category"}
						/>
						<FormSelect
							placeholder="Year Released"
							options={[
								{ label: "2018", value: 2018 },
								{ label: "2019", value: 2019 },
								{ label: "2020", value: 2020 },
								{ label: "2021", value: 2021 },
								{ label: "2022", value: 2022 },
								{ label: "2023", value: 2023 },
								{ label: "2024", value: 2024 },
							]}
							identifier={"year"}
						/>
					</div>
					<MyFormTextArea name={"description"} label="Description" />
				</div>

				<div className="flex justify-start gap-4">
					<Button text="Add product" type="submit" />
				</div>
			</FormContainer>
		</div>
	);
};

export default AddProduct;
