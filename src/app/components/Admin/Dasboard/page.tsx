"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface Book {
  id: string;
  title: string;
  stock: number;
  price: number;
  image: string;
}

const Dashboard = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [outOfStockBooks, setOutOfStockBooks] = useState(0);

  const [totalOrders, setTotalOrders] = useState(0);
  const [approvedOrders, setApprovedOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [declinedOrders, setDeclinedOrders] = useState(0);

  useEffect(() => {
    // Fetch books
    const fetchBooks = async () => {
      try {
        const res = await fetch("/api/books");
        const data = await res.json();

        if (Array.isArray(data.books)) {
          setBooks(data.books);

          const total = data.books.length;
          const outOfStock = data.books.filter(
            (book: Book) => book.stock === 0
          ).length;

          setTotalBooks(total);
          setOutOfStockBooks(outOfStock);
        } else {
          console.error("Books data is invalid");
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    // Fetch orders
    const fetchTotalOrders = async () => {
      try {
        const res = await fetch("/api/Orderdata/order");
        const data = await res.json();

        if (Array.isArray(data.orders)) {
          setTotalOrders(data.totalOrders);
          setApprovedOrders(data.approvedCount);
          setPendingOrders(data.pendingCount);
          setDeclinedOrders(data.declinedCount);
        } else {
          console.error("Orders data is invalid");
        }
      } catch (error) {
        console.error("Failed to fetch order data:", error);
      }
    };

    fetchBooks();
    fetchTotalOrders();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Admin Dashboard
      </h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Total Books */}
        <DashboardCard title="Total Books" value={totalBooks} color="blue" />

        {/* Total Orders */}
        <DashboardCard title="Total Orders" value={totalOrders} color="blue" />

        {/* Out of Stock */}
        <DashboardCard
          title="Out of Stock"
          value={outOfStockBooks}
          color="red"
        />

        {/* Approved Orders */}
        <DashboardCard
          title="Approved Orders"
          value={approvedOrders}
          color="green"
        />

        {/* Pending Orders */}
        <DashboardCard
          title="Pending Orders"
          value={pendingOrders}
          color="yellow"
        />

        {/* Declined Orders */}
        <DashboardCard
          title="Declined Orders"
          value={declinedOrders}
          color="red"
        />
      </div>

      {/* Book List */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Books List
        </h2>
        <div className="space-y-4">
          {books.map((book) => (
            <div
              key={book.id}
              className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={book.image}
                  alt={book.title}
                  height={100}
                  width={80}
                  className="w-16 h-24 object-cover rounded-md"
                />
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {book.title}
                  </p>
                  <p className="text-sm text-gray-500">Stock: {book.stock}</p>
                  <p className="text-sm text-gray-500">Price: ${book.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Reusable Card Component
const DashboardCard = ({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) => {
  const colorMap: any = {
    blue: "text-blue-600",
    red: "text-red-600",
    green: "text-green-600",
    yellow: "text-yellow-600",
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      <p className={`text-4xl font-bold ${colorMap[color]}`}>{value}</p>
    </div>
  );
};

export default Dashboard;
