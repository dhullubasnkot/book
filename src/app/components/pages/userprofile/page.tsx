"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDownIcon, UserIcon, PackageIcon } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../navbar";

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        try {
          const response = await fetch(
            `/api/Orderdata/order?email=${user.email}`
          );
          const data = await response.json();
          if (Array.isArray(data.orders)) {
            setOrders(data.orders);
          } else {
            console.error(
              "Error fetching orders:",
              data.error || "Unknown error"
            );
          }
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchOrders();
    }
  }, [user]);

  const handleLogout = () => {
    // Clear user data from localStorage and redirect to login page
    localStorage.removeItem("user");
    router.push("/login");
  };

  const handleClearHistory = () => {
    // Clear the user's order history
    setOrders([]);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 py-8 mt-14">
        <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-8">
          <div className="flex items-center mb-6 border-b pb-4">
            <UserIcon className="w-8 h-8 text-blue-500 mr-2" />
            <h1 className="text-3xl font-semibold text-gray-800">
              Your Profile
            </h1>
          </div>

          {user ? (
            <div>
              <div className="mb-8 p-4 border rounded-md bg-gray-50">
                <h2 className="text-xl font-medium text-gray-700 mb-3 flex items-center">
                  <UserIcon className="w-5 h-5 text-blue-500 mr-2" />
                  User Information
                </h2>
                <p className="text-gray-600">
                  <strong>Name:</strong> {user.name}
                </p>
                <p className="text-gray-600">
                  <strong>Email:</strong> {user.email}
                </p>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <PackageIcon className="w-6 h-6 text-indigo-500 mr-2" />
                  <h2 className="text-xl font-medium text-gray-700">
                    Order History
                  </h2>
                </div>
                {orders.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse rounded-lg overflow-hidden shadow-sm">
                      <thead className="bg-gray-200">
                        <tr>
                          <th className="py-3 px-4 text-left font-semibold text-gray-700 uppercase">
                            Order ID
                          </th>
                          <th className="py-3 px-4 text-left font-semibold text-gray-700 uppercase">
                            Status
                          </th>
                          <th className="py-3 px-4 text-left font-semibold text-gray-700 uppercase">
                            Delivered
                          </th>
                          <th className="py-3 px-4 text-left font-semibold text-gray-700 uppercase">
                            Order Date
                          </th>
                          <th className="py-3 px-4 text-left font-semibold text-gray-700 uppercase">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order: any) => (
                          <motion.tr
                            key={order.id}
                            className="bg-white hover:bg-gray-100 transition-colors duration-200"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <td className="py-3 px-4 text-gray-600">
                              {order.id}
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`inline-block px-3 py-1 rounded-full text-white text-sm font-semibold ${
                                  order.status === "approved"
                                    ? "bg-green-500"
                                    : order.status === "declined"
                                    ? "bg-red-500"
                                    : "bg-yellow-500"
                                }`}
                              >
                                {order.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`inline-block px-3 py-1 rounded-full text-white text-sm font-semibold ${
                                  order.is_delivered
                                    ? "bg-blue-500"
                                    : "bg-gray-500"
                                }`}
                              >
                                {order.is_delivered ? "Yes" : "No"}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-gray-600">
                              {new Date(order.created_at).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4">
                              <button
                                onClick={() => setSelectedOrder(order)}
                                className="text-indigo-600 hover:underline focus:outline-none"
                              >
                                View Details
                              </button>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-600">No orders found.</p>
                )}
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg"
                >
                  Logout
                </button>
                <button
                  onClick={handleClearHistory}
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                >
                  Clear Order History
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">Loading user data...</p>
          )}

          {selectedOrder && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Order Details
                  </h3>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    <ChevronDownIcon className="w-6 h-6 rotate-180" />
                  </button>
                </div>
                <p className="text-gray-600 mb-2">
                  <strong>Order ID:</strong> {selectedOrder.id}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Status:</strong> {selectedOrder.status}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Delivered:</strong>{" "}
                  {selectedOrder.is_delivered ? "Yes" : "No"}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Order Date:</strong>{" "}
                  {new Date(selectedOrder.created_at).toLocaleString()}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Total Price:</strong> Rs.{" "}
                  {selectedOrder.total_amount
                    ? Number(selectedOrder.total_amount).toFixed(2)
                    : "0.00"}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Total Books:</strong> {selectedOrder.total_books || 0}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Books:</strong>{" "}
                  {Array.isArray(selectedOrder.cart_items) &&
                  selectedOrder.cart_items.length > 0
                    ? selectedOrder.cart_items
                        .map((book: any) => book.title)
                        .join(", ")
                    : "Invalid cart data"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
