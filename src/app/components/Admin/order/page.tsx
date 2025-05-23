"use client";
import { useEffect, useState } from "react";

export default function ManageOrders() {
  interface Order {
    id: number;
    name: string;
    email: string;
    phone: string;
    street: string;
    location_url: string;
    status: string;
    is_delivered: number;
    total_amount: number; // Total price for the order
    total_books: number; // Total number of books in the order
    cart_items: string; // JSON string of book objects
  }

  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<
    "all" | "approved" | "declined" | "pending" | "delivered" | "not_delivered"
  >("all");

  useEffect(() => {
    fetch("/api/Orderdata/order")
      .then((res) => res.json())
      .then((data) => setOrders(data.orders))
      .catch((err) => console.error("Error loading orders:", err));
  }, []);

  const updateOrder = async (
    id: number,
    status?: string,
    is_delivered?: number
  ) => {
    const updatedOrders = orders.map((order) =>
      order.id === id
        ? {
            ...order,
            ...(status && { status }),
            ...(is_delivered !== undefined && { is_delivered }),
          }
        : order
    );
    setOrders(updatedOrders);

    try {
      const res = await fetch("/api/Orderdata/updateorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status, is_delivered }),
      });

      const result = await res.json();
      if (!result.success) alert("Failed to update order.");
    } catch (err) {
      alert("Error updating order.");
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;
    if (filter === "delivered") return order.is_delivered === 1;
    if (filter === "not_delivered") return order.is_delivered === 0;
    return order.status === filter;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Orders</h1>

      <div className="mb-6 flex gap-4 flex-wrap">
        {[
          "all",
          "pending",
          "approved",
          "declined",
          "delivered",
          "not_delivered",
        ].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-4 py-2 rounded ${
              filter === f ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {filteredOrders.map((order) => (
            <li key={order.id} className="p-4 bg-white shadow rounded-md">
              <p>
                <strong>Name:</strong> {order.name}
              </p>
              <p>
                <strong>Email:</strong> {order.email}
              </p>
              <p>
                <strong>Phone:</strong> {order.phone}
              </p>
              <p>
                <strong>Street:</strong> {order.street}
              </p>
              <p>
                <strong>Location:</strong>{" "}
                <a
                  href={order.location_url}
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  Maps
                </a>
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Total Price:</strong> Rs.{" "}
                {Number(order.total_amount || 0).toFixed(2)}
              </p>
              <p>
                <strong>Total Books:</strong> {order.total_books}
              </p>
              <p>
                <strong>Books:</strong>{" "}
                {Array.isArray(order.cart_items) && order.cart_items.length > 0
                  ? order.cart_items.map((book: any) => book.title).join(", ")
                  : "Invalid cart data"}
              </p>
              {order.status === "approved" && (
                <p>
                  <strong>Delivered:</strong>{" "}
                  {order.is_delivered ? "Yes" : "No"}
                </p>
              )}

              <div className="mt-2 space-x-2">
                {order.status === "pending" && (
                  <>
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded"
                      onClick={() => updateOrder(order.id, "approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => updateOrder(order.id, "declined")}
                    >
                      Decline
                    </button>
                  </>
                )}

                {order.status === "approved" && (
                  <>
                    {order.is_delivered ? (
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        disabled
                      >
                        Delivered
                      </button>
                    ) : (
                      <button
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={() => updateOrder(order.id, undefined, 1)}
                      >
                        Mark as Delivered
                      </button>
                    )}
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
