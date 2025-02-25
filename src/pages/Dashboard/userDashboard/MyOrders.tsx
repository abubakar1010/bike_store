/* eslint-disable @typescript-eslint/no-explicit-any */

import Loading from "../../../components/ui/Loading";
import { selectUser } from "../../../redux/features/auth/authSlice";
import { useGetOrdersByCustomerQuery } from "../../../redux/features/order/orderApi";
import { useAppSelector } from "../../../redux/store/hook";
import { cn } from "../../../utils/tailwindUtility";

const MyOrders = () => {
	const user = useAppSelector(selectUser);
	const userId = user?.id;
	console.log(user);
	const {
		data: response,
		isLoading,
		isError,
	} = useGetOrdersByCustomerQuery(userId, { skip: !userId });

	if (isLoading) {
		return <Loading />;
	}
	if (isError) {
		return (
			<h3 className="text-main font-bold text-2xl flex items-center justify-center h-screen">
				Something went wrong please try again
			</h3>
		);
	}

	const myOrders = response?.data;

	if (!myOrders.length) {
		return (
			<h3 className="text-main font-bold text-2xl flex items-center justify-center h-screen">
				No Order Yet!
			</h3>
		);
	}

	return (
		<div className="mt-6">
			<div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
				<div className="px-6 py-4 border-b border-gray-200">
					<h2 className="text-lg font-semibold text-gray-800">
						My Ordered products
					</h2>
				</div>
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Order Time
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									product Details
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Customer Info
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Order Details
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Payment
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Shipping Status
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{myOrders?.map((order: any) => (
								<tr key={order?._id}>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="text-sm text-gray-500">
											{new Date(order?.createdAt)?.toLocaleDateString()}
										</div>
										<div className="text-sm text-gray-500">
											{new Date(order?.createdAt)?.toLocaleTimeString()}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="text-sm text-gray-900">
											{order?.product?.brand} {order?.product?.model}
										</div>
										<div className="text-sm text-gray-500">
											Year: {order?.product?.year}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="text-sm text-gray-900">{order?.email}</div>
										<div className="text-sm text-gray-500">{order?.phone}</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="text-sm text-gray-900">
											Quantity: {order?.quantity}
										</div>
										<div className="text-sm font-medium text-gray-900">
											Total: ${order?.totalPrice?.toLocaleString()}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="text-sm text-gray-500">{order?.method}</div>
										<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
											{order?.status}
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span
											className={cn(
												"px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-slate-200",
												{
													"text-blue-500 bg-blue-100":
														order?.shippingStatus === "Shipped",
													"text-green-500 bg-green-100":
														order?.shippingStatus === "Delivered",
													"text-yellow-500":
														order?.shippingStatus === "Processing",
												}
											)}
										>
											{order?.shippingStatus || "Processing"}
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default MyOrders;
