/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDeleteProductMutation } from "../redux/features/product/productApi";
import { TProduct } from "../types/Product";
import Button from "./ui/shared/Button";
import { cn } from "../utils/tailwindUtility";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";

const ProductCard = ({
	product,
	isAdmin,
}: {
	product: TProduct;
	isAdmin?: boolean;
}) => {
	const navigate = useNavigate();
	const [deleteProduct] = useDeleteProductMutation();

	const handleDelete = async () => {
		try {
			const result = await deleteProduct(product?._id).unwrap();
			if (result?.success) {
				toast.success(result?.message);
			} else {
				toast.error(result?.message);
			}
		} catch (error: any) {
			if (error?.status === 401) {
				toast.error(error?.data?.message);
				return;
			}
			toast.error(error?.data?.message || "Something went wrong");
		}
	};

	return (
		<motion.div
			className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
			transition={{ duration: 0.3 }}
		>
			<div className="relative h-48">
				<div
					className={cn(
						"absolute top-2 left-2 text-white text-xs font-semibold py-1 px-2 rounded",
						{
							"bg-green-500": product.inStock,
							"bg-rose-500": !product.inStock,
						}
					)}
				>
					{product?.inStock ? "In Stock" : "Out of Stock"}
				</div>
				<img
					src={
						product?.image ||
						"https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					}
					alt={product.brand || "Product Image"}
					className="w-full h-full object-cover"
				/>
			</div>
			<div className="p-4">
				<h3 className="text-2xl font-semibold mb-2">
					<span className="text-primary">{product.model}</span>
				</h3>
				<p className="text-sm font-semibold mb-2">Model: {product?.model}</p>
				<p className="text-sm font-semibold mb-2">Brand: {product?.brand}</p>
				<p className="text-sm font-semibold mb-2">
					Category: {product?.category}
				</p>
				<p className="text-sm text-primary font-semibold mb-2">
					Price: ${product.price}
				</p>
				{/* View Details button */}
				<div className="flex justify-end items-center">
					{!isAdmin && (
						<Button
							text={"View Details"}
							handleClick={() => {
								navigate(`/product/${product?._id}`);
							}}
						/>
					)}
				</div>
				{isAdmin && (
					<div className="flex items-center justify-end gap-4 text-xl">
						<button onClick={() => {
								navigate(`/admin/edit-product/${product?._id}`);
							}}>
							<BiEditAlt />
						</button>
						<button onClick={handleDelete} className="text-red-500 cursor-pointer" >
            <RiDeleteBin6Line className=" cursor-pointer" />
            </button>
					</div>
				)}
			</div>
		</motion.div>
	);
};

export default ProductCard;
