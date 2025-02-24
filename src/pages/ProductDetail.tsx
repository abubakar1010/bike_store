import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/ui/Loading";
import { useGetSingleProductQuery } from "../redux/features/product/productApi";
import Button from "../components/ui/shared/Button";

const ProductDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { data: response, isLoading, isError } = useGetSingleProductQuery(id);

	// Loading state
	if (isLoading) {
		return <Loading />;
	}

	// Error state
	if (isError || !response) {
		return (
			<h3 className="text-main font-bold text-2xl flex items-center justify-center h-screen">
				Please refresh and try again.
			</h3>
		);
	}

	// Car data from the response
	const car = response?.data;

	if (!car) {
		return (
			<h3 className="text-main font-bold text-2xl flex items-center justify-center h-screen">
				Car not found!
			</h3>
		);
	}

	return (
		<div className="max-w-6xl  w-[95%] md:w-[88%] mx-auto flex flex-col items-center justify-center">
			<div className="">
				{/* Image Section */}
				<div>
					<img
						src={
							car?.image ||
							"https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						} // Assuming `car.image` contains the image URL
						alt={`${car.brand} ${car.model}`}
						className="w-full h-64 md:h-96 object-cover rounded-lg shadow-md"
					/>
				</div>

				{/* Details Section */}
				<div className="flex flex-col justify-center gap-4 mt-7">
					<h3 className="text-primary text-2xl md:text-3xl font-bold">
						{car.brand} {car.model}
					</h3>
					<p>{car.description}</p>
					<div className="flex flex-col text-sm gap-1">
						<p>
							<span className="font-semibold">Brand:</span> {car.brand}
						</p>
						<p>
							<span className="font-semibold">Model:</span> Sv8K
						</p>
						<p>
							<span className="font-semibold">Year:</span> 2003
						</p>
						<p>
							<span className="font-semibold">Category:</span> {car.category}
						</p>
						<p>
							<span className="font-semibold">Price:</span> $
							{car.price.toLocaleString()}
						</p>
						<p>
							<span className="font-semibold">Description:</span>{" "}
							{car.description}
						</p>
						<p>
							<span className="font-semibold">Stock:</span> {car.quantity}
						</p>
					</div>
					<Button
						text="Buy Now"
						handleClick={() => {
							navigate(`/checkout?id=${id}`);
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
