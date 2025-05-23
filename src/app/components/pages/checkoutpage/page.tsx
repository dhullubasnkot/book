"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaShoppingCart, FaLock, FaTruck } from "react-icons/fa";

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isGift, setIsGift] = useState(false); // State for the gift option

  useEffect(() => {
    const user = localStorage.getItem("user");
    const cart = localStorage.getItem("cart");

    if (!user) {
      alert("Please log in to access the checkout page.");
      router.push("/login");
      return;
    }

    if (!cart) {
      alert("Your cart is empty.");
      router.push("/");
      return;
    }

    try {
      setCartItems(JSON.parse(cart));
    } catch (error) {
      console.error("Error parsing cart data:", error);
      alert("Error loading cart data.");
      router.push("/");
    }

    const giftOption = localStorage.getItem("isGift");
    if (giftOption) {
      setIsGift(JSON.parse(giftOption)); // Get the gift option
    }
  }, [router]);

  const total = cartItems.reduce(
    (acc, item: any) => acc + item.quantity * item.price,
    0
  );

  const giftAmount = isGift ? 115 : 0; // Rs. 115 for gift wrapping
  const totalWithGift = total + giftAmount;

  const handleEsewaPayment = () => {
    router.push("/components/pages/payment/esewa");
  };

  const handleCashOnDelivery = () => {
    router.push("/components/pages/payment/cashdelivery");
  };

  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-md p-8">
        <div className="flex items-center mb-6">
          <FaShoppingCart className="text-green-500 text-2xl mr-2" />
          <h1 className="text-2xl font-semibold text-gray-800">
            Secure Checkout
          </h1>
        </div>

        {cartItems.length > 0 ? (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Order Summary
            </h2>
            <ul className="mb-6">
              {cartItems.map((item: any) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between border-b py-3"
                >
                  <div className="flex-grow">
                    <p className="text-gray-600">{item.title}</p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <span className="font-semibold text-gray-700">
                    Rs. {item.price * item.quantity}
                  </span>
                </li>
              ))}
            </ul>

            {/* Display gift wrapping amount */}
            {isGift && (
              <div className="py-4 border-t border-b font-semibold text-gray-800">
                Gift Wrapping: Rs. 115
              </div>
            )}

            <div className="py-4 border-t border-b font-semibold text-gray-800">
              Total: Rs. {totalWithGift.toFixed(2)}
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Payment Options
              </h2>
              <div className="space-y-4">
                <button
                  onClick={handleEsewaPayment}
                  className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline w-full justify-center"
                >
                  <FaLock className="mr-2" /> Pay with eSewa
                </button>
                <button
                  onClick={handleCashOnDelivery}
                  className="flex items-center bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline w-full justify-center"
                >
                  <FaTruck className="mr-2" /> Cash on Delivery
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">Your cart is currently empty.</p>
            <button
              onClick={() => router.push("/")}
              className="mt-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Go to Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
