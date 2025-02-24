/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, GetProps, Input, Select } from "antd";
import "rc-slider/assets/index.css";
import Loading from "../../components/ui/Loading";
import { useGetAllProductsQuery } from "../../redux/features/product/productApi";
import {
	availabilities,
	brands,
	categories,
	models,
} from "../../constant/product.constant";
import { IProduct } from "../Dashboard/adminDashboard/ProductManagement";
import { ScrollRestoration } from "react-router";
import ProductCard from "../../components/Card";
import Slider from "rc-slider";
type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

const Shop = () => {
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
				Please Refresh and try again
			</h3>
		);
	}
	const products = response?.data;

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

	const handleSliderChange = (value: any) => {
		setPriceRange(value);
	  };

	return (
		<>
			<div className="w-[90%] md:w-[88%] mx-auto">
				<section className="my-2 md:my-6 bg-gray-100">
					<div className="flex gap-4 flex-wrap justify-between items-center">
						<Search
							className="lg:basis-2/6 hover:outline-0"
							placeholder="Search by brand, product name or category"
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
								// color="green"
								// type="primary"
								className=" !py-[8px] !h-full !bg-green-500 !text-white hover:!border-green-300 "
							>
								Clear Filter
							</Button>
						</div>
					</div>

					<div className="p-6 mt-4 bg-white shadow-md rounded-md z-30">
						<Slider
							range
							min={0}
							max={200000}
							value={priceRange}
							onChange={handleSliderChange}
							trackStyle={[{ backgroundColor: "#42e529", height: 8 }]}
							handleStyle={[
								{
									borderColor: "#8de529",
									height: 24,
									width: 24,
									marginTop: -8,
								},
								{
									borderColor: "#8de529",
									height: 24,
									width: 24,
									marginTop: -8,
								},
							]}
							railStyle={{ backgroundColor: "#e5e7eb", height: 8 }}
						/>

						<p className="mt-3 text-gray-600">
							Price Range:{" "}
							<span className="font-semibold">${priceRange[0]}</span> -{" "}
							<span className="font-semibold">${priceRange[1]}</span>
						</p>
					</div>

					{/* product productds  */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
						{products?.result?.map((product: IProduct, index: number) => (
							<ProductCard key={index} product={product} />
						))}
					</div>
				</section>
			</div>

			<ScrollRestoration />
		</>
	);
};

export default Shop;
