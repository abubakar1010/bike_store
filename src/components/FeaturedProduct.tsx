import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../redux/features/product/productApi";
import Loading from "./ui/Loading";
import SectionTitle from "./SectionTitle";
import { TProduct } from "../types/Product";
import Button from "./ui/shared/Button";
import ProductCard from "./Card";

export const FeaturedProducts = () => {
	const queryParams = [{ name: "limit", value: 8 }];
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
				Please Refresh The Page and try again
			</h3>
		);
	}
	const products = response?.data;
	return (
		<section className="my-8 md:my-16 bg-gray-100">
			<div className="w-[90%] md:w-[88%] mx-auto">
				<SectionTitle
					heading="Featured products"
					description="Check out our latest featured products"
				/>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
					{products?.result?.map((product: TProduct, index: number) => (
						<ProductCard key={index} product={product} />
					))}
				</div>
				<div className="text-center mt-5 flex justify-end">
					<Link to="/shop">
						<Button text="View All Product" />
					</Link>
				</div>
			</div>
		</section>
	);
};
