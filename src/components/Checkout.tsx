import { FormEvent, useState } from "react";
import { ScrollRestoration, useSearchParams } from "react-router";
import { useAppSelector } from "../redux/store/hook";
import { useCreateOrderMutation } from "../redux/features/order/orderApi";
import { useGetSingleProductQuery } from "../redux/features/product/productApi";
import { selectUser } from "../redux/features/auth/authSlice";
import Loading from "./ui/Loading";
import { toast } from "react-toastify";
import Button from "./ui/shared/Button";

const CheckoutPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [searchParams] = useSearchParams();
  const userDetails = useAppSelector(selectUser);
  const id = searchParams.get("id");
  const { data: response, isLoading, isError } = useGetSingleProductQuery(id);
  const [createOrder] = useCreateOrderMutation();

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

  const totalPrice = quantity * product.price;

  const handleQuantityChange = (value: number) => {
    if (product.inStock) {
      setQuantity(value);
    }
  };

  const handlePayment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (quantity > product.quantity) {
      toast.error(`Stock has only ${product.quantity} Item`);
      return; 
    }

    const form = e.target;
    const email = (form as HTMLFormElement).email.value;
    const address = (form as HTMLFormElement).address.value;
    const phone = (form as HTMLFormElement).phone.value;
    const productId = id;
    const payload = {
      email,
      product: productId,
      quantity,
      address,
      phone,
      totalPrice,
    };
    try {
      const response = await createOrder(payload).unwrap();
      if (response.success) {
        console.log(response)
        toast.success("Order Placed");
        window.location.href = response.data;
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Error submitting test answers:", error);
    }
  };
  return (
    <>
      <div className="mt-32 md:mt-40 w-[90%] md:w-[88%] mx-auto mb-16">
        <div className="max-w-xl mx-auto p-4 shadow-lg bg-white rounded-md">
          <div className="w-full">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              Checkout
            </h2>

            {/* product Details */}
            <div className="mb-4">
              <p>
                Name: {product.brand} {product.model}
              </p>
              <p>
                Price:{" "}
                <span className="text-primary font-semibold">${product.price}</span>
              </p>
              <p>Stock: {product.inStock ? "In Stock" : "Out of Stock"}</p>
            </div>

            {/* Order Form */}
            <form onSubmit={handlePayment} className="mb-4">
              <div className="flex flex-col gap-3">
                <div>
                  <label className="block mb-2">Quantity: (max:5)</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      handleQuantityChange(Number(e.target.value))
                    }
                    className="border rounded px-2 py-1 w-full"
                    min={1}
                    max={5}
                  />
                </div>
                <div>
                  <label className="block mb-2">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={userDetails?.name}
                    className="border rounded px-2 py-1 w-full"
                    required
                    disabled
                  />
                </div>
                <div>
                  <label className="block mb-2">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={userDetails?.email}
                    className="border rounded px-2 py-1 w-full"
                    required
                    disabled
                  />
                </div>
                <div>
                  <label className="block mb-2">Phone:</label>
                  <input
                    type="text"
                    name="phone"
                    className="border rounded px-2 py-1 w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2">Address:</label>
                  <textarea
                    name="address"
                    className="border rounded px-2 py-1 w-full h-32"
                    required
                  />
                </div>
              </div>
              {/* Total Price */}
              <div className="mb-4">
                <h3 className="text-lg font-medium">Total Price</h3>
                <p>${totalPrice}</p>
              </div>

              {/* Submit Button */}
                <Button text="Order Now" isFullWidth={true} />
            </form>
          </div>
        </div>
      </div>
      <ScrollRestoration />
    </>
  );
};

export default CheckoutPage;
