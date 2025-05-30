"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaRoad,
  FaMapMarkerAlt,
  FaStickyNote,
  FaCheckCircle,
} from "react-icons/fa";
import Navbar from "../../navbar";
import { useCart } from "@/app/components/pages/context/CardContext";

export default function CashOnDelivery() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    street: "",
    locationUrl: "",
    notes: "",
  });

  const router = useRouter();
  const { clearCart } = useCart();

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cart = localStorage.getItem("cart");
    if (!cart) {
      alert("Cart is empty.");
      return;
    }

    const cartItems = JSON.parse(cart);
    const totalAmount = cartItems.reduce(
      (acc: number, item: any) => acc + item.price * item.quantity,
      0
    );
    const totalBooks = cartItems.reduce(
      (acc: number, item: any) => acc + item.quantity,
      0
    );

    const dataToSend = {
      ...formData,
      cartItems,
      totalAmount,
      totalBooks,
    };

    const res = await fetch("/api/cashdelivery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    if (res.ok) {
      clearCart();
      localStorage.removeItem("cart");
      router.push("/components/pages/payment/sucess");
    } else {
      const result = await res.json();
      alert(result.error || "Something went wrong while placing your order.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="h-[110vh] py-12 flex justify-center items-center">
        <div className="bg-white rounded-lg p-8 w-full max-w-md">
          <div className="flex items-center justify-center mb-6">
            <FaCheckCircle className="text-green-500 text-4xl mr-2" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Cash on Delivery
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              {
                id: "name",
                icon: FaUser,
                placeholder: "Your Full Name",
                type: "text",
                required: true,
                disabled: true,
              },
              {
                id: "phone",
                icon: FaPhone,
                placeholder: "Your Phone Number",
                type: "tel",
                required: true,
              },
              {
                id: "email",
                icon: FaEnvelope,
                placeholder: "Your Email Address",
                type: "email",
                disabled: true,
              },
              {
                id: "street",
                icon: FaRoad,
                placeholder: "House No., Street Name, Landmark",
                type: "text",
                required: true,
              },
              {
                id: "locationUrl",
                icon: FaMapMarkerAlt,
                placeholder: "Paste your Google Map Link here",
                type: "url",
              },
            ].map(({ id, icon: Icon, ...rest }) => (
              <div key={id}>
                <label
                  htmlFor={id}
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  <Icon className="inline-block mr-2" />
                  {id.charAt(0).toUpperCase() + id.slice(1)}:
                </label>
                <input
                  id={id}
                  name={id}
                  type={rest.type}
                  placeholder={rest.placeholder}
                  required={rest.required}
                  disabled={rest.disabled || false}
                  value={formData[id as keyof typeof formData] || ""}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            ))}

            <div>
              <label
                htmlFor="notes"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                <FaStickyNote className="inline-block mr-2" /> Delivery Notes:
              </label>
              <textarea
                id="notes"
                name="notes"
                placeholder="Any specific instructions for delivery?"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleChange}
                rows={3}
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline w-full"
            >
              <FaCheckCircle className="inline-block mr-2" /> Place Order
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
