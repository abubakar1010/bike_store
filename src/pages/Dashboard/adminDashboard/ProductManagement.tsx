/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, GetProps, Input, Select } from "antd";
import "rc-slider/assets/index.css";
import { useGetAllProductsQuery } from "../../../redux/features/product/productApi";
import Loading from "../../../components/ui/Loading";
import ProductCard from "../../../components/Card";

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

const models = ["Corolla", "Civic", "Model 3", "F-150", "X5"];
const brands = ["Toyota", "Honda", "Tesla", "Ford", "BMW"];
const categories = ["Sedan", "Electric", "Pickup Truck", "SUV"];
const availabilities = [
	{ name: "In Stock", value: "inStock" },
	{ name: "Out of Stock", value: "outOfStock" },
];

export interface IProduct {
	_id: string;
	brand: string;
	model: string;
	image?: string;
	year: number;
	price: number;
	category: string;
	description: string;
	quantity: number;
	inStock: boolean;
}

const ProductManagement = () => {
	const [search, setSearch] = useState("");
	const [model, setModel] = useState("");
	const [brand, setBrand] = useState("");
	const [category, setCategory] = useState("");
	const [availability, setAvailability] = useState("");
	const [priceRange, setPriceRange] = useState<any>([]);
	// console.log(priceRange);
	const queryParams = [
		{ name: "searchTerm", value: search },
		{ name: "model", value: model },
		{ name: "brand", value: brand },
		{ name: "category", value: category },
		{ name: "availability", value: availability },
		{ name: "priceRange", value: priceRange },
	];
	const {
		data: response,
		isLoading,
		isError,
	} = useGetAllProductsQuery(queryParams);

	if (isLoading) {
		return <Loading />;
	}
	if (isError) {
		return (
			<h3 className="text-main font-bold text-2xl flex items-center justify-center h-screen">
				Broh! Refresh and try again
			</h3>
		);
	}
	const products = response?.data?.result;

	console.log(response?.data?.result);

	console.log(search, model, brand, category, availability);

	const handleModelChange = (value: string) => {
		setModel(value);
	};
	const handleBrandChange = (value: string) => {
		setBrand(value);
	};
	const handleCategoryChange = (value: string) => {
		setCategory(value);
	};
	const handleAvailabilityChange = (value: string) => {
		setAvailability(value);
	};
	const handleResetFilter = () => {
		setModel("");
		setBrand("");
		setCategory("");
		setAvailability("");
		setPriceRange([]);
		window.location.reload();
	};
	const onSearch: SearchProps["onSearch"] = (value) => {
		setSearch(value);
	};
	return (
		<section className="my-6 bg-gray-100">
			<div className="flex gap-4 flex-wrap justify-between items-center">
				<Search
					className="lg:basis-2/6 hover:outline-0"
					placeholder="Search by brand, bike name or category"
					allowClear
					enterButton={
						<button className="bg-green-500 hover:bg-green-600 text-white px-6  py-[12px] rounded-ee-4xl ">
							Search
						</button>
					}
					size="large"
					onSearch={onSearch}
				/>
				<div className="flex flex-wrap items-center gap-4">
					<Select
						placeholder="Filter by model"
						style={{ width: 160, height: 40 }}
						onChange={handleModelChange}
						options={models.map((model) => ({
							label: model,
							value: model,
						}))}
					/>
					<Select
						placeholder="Filter by brand"
						style={{ width: 160, height: 40 }}
						onChange={handleBrandChange}
						options={brands.map((brand) => ({
							label: brand,
							value: brand,
						}))}
					/>
					<Select
						placeholder="Filter by category"
						style={{ width: 160, height: 40 }}
						onChange={handleCategoryChange}
						options={categories.map((category) => ({
							label: category,
							value: category,
						}))}
					/>
					<Select
						placeholder="Filter by availability"
						style={{ width: 160, height: 40 }}
						onChange={handleAvailabilityChange}
						options={availabilities.map((option) => ({
							label: option.name,
							value: option.value,
						}))}
					/>
					<Button
						onClick={handleResetFilter}
						className=" !py-[8px] !h-full !bg-green-500 !text-white hover:!border-green-300 "
					>
						Clear Filter
					</Button>
				</div>
			</div>

			{/* product cards  */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6 mt-4">
				{products?.map((product: IProduct, index: number) => (
					<ProductCard key={index} product={product} isAdmin={true} />
				))}
			</div>
		</section>
	);
};

export default ProductManagement;
