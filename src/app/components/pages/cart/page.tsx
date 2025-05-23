"use client";
import { useCart } from "../context/CardContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import Navbar from "../navbar";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const router = useRouter();
  const [isGift, setIsGift] = useState(false); // State for the gift wrapping option

  const totalPrice = cart
    .reduce((sum, book) => {
      const bookPrice = Number(book.price) || 0;
      const quantity = book.quantity ?? 1;
      return sum + bookPrice * quantity;
    }, 0)
    .toFixed(2);

  // Save the gift wrapping option to localStorage
  useEffect(() => {
    localStorage.setItem("isGift", JSON.stringify(isGift));
  }, [isGift]);

  const handleProceedToCheckout = () => {
    const user = localStorage.getItem("user");
    if (user) {
      router.push("/components/pages/checkoutpage");
    } else {
      alert("Please login to proceed to checkout.");
      router.push("/login");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Shopping Cart (
            {cart.reduce((acc, item) => acc + (item.quantity ?? 1), 0)} items)
          </h1>

          {cart.length === 0 ? (
            <div className="text-center">
              <p className="text-gray-500 text-xl">Your cart is empty.</p>
              <button
                onClick={() => router.push("/")}
                className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((book) => (
                <div key={book.id} className="flex items-center border-b pb-4">
                  <Image
                    src={book.image}
                    alt={book.title}
                    width={80}
                    height={120}
                    className="rounded-md"
                  />
                  <div className="ml-4 flex-grow">
                    <p className="font-semibold text-lg text-gray-800">
                      {book.title}
                    </p>
                    <p className="text-sm text-gray-500">by {book.author}</p>
                    <p className="font-bold mt-1 text-gray-800">
                      Rs. {Number(book.price).toFixed(2)}
                    </p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => updateQuantity(book.id, -1)}
                        className="px-3 py-1 bg-gray-200 rounded-md"
                      >
                        -
                      </button>
                      <span className="mx-2 text-lg">{book.quantity ?? 1}</span>
                      <button
                        onClick={() => updateQuantity(book.id, 1)}
                        className="px-3 py-1 bg-gray-200 rounded-md"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(book.id)}
                    className="ml-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary */}
        {cart.length > 0 && (
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Order Summary
            </h2>
            <p className="text-lg font-semibold">Subtotal: Rs. {totalPrice}</p>

            {/* Gift Wrapping Option */}
            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                id="giftOption"
                checked={isGift}
                onChange={() => setIsGift(!isGift)}
                className="mr-2"
              />
              <label htmlFor="giftOption" className="text-gray-700">
                Add Gift Wrapping (+ Rs. 115)
              </label>
            </div>

            {/* Button to proceed to checkout */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full bg-blue-600 text-white mt-4 px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
            >
              Proceed to Checkout
            </button>
            <p className="text-sm text-gray-500 mt-4">Payment Options:</p>
            <div className="flex gap-4 mt-2">
              <Image
                src="/books/fone.png"
                alt="Fonepay"
                width={50}
                height={30}
              />
              <Image
                src="/books/esewa.png"
                alt="Esewa"
                width={50}
                height={30}
              />
              <Image src="/books/cash.png" alt="Cash" width={50} height={30} />
            </div>
            {/* Clear Cart Button */}
            <button
              onClick={clearCart}
              className="w-full mt-4 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-all duration-300"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
