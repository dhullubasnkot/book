"use client";
import { useEffect } from "react";
import { useCart } from "@/app/components/pages/context/CardContext";
import { useRouter } from "next/navigation";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    clearCart(); // ✅ clear cart on load
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        Payment Successful ✅
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Thank you for your order! Your items will be delivered soon.
      </p>
      <button
        onClick={() => router.push("/")}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Continue Shopping
      </button>
    </div>
  );
}
