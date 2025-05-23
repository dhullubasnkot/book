"use client"; // Make sure it's a client-side component

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  PlusCircle,
  TrendingUp,
  MinusCircle,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null); // Store the user data here
  const router = useRouter();

  useEffect(() => {
    // Retrieve user data from localStorage to check for login status and role
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Check if the user is an admin
      if (parsedUser.role !== "admin") {
        router.push("/"); // Redirect non-admins to the homepage or another page
      }
    } else {
      router.push("/login"); // Redirect to login if no user data is found
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data from localStorage
    setUser(null); // Reset user state
    router.push("/login"); // Redirect to login page
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <div className="text-2xl font-bold text-blue-600 mb-10">
          📚 Admin Panel
        </div>
        <nav className="space-y-4">
          {/* Admin Panel Links */}
          <Link
            href="/components/Admin/Dasboard"
            className="flex items-center gap-2 px-4 py-3 rounded-md text-white bg-gray-500 hover:bg-gray-600 transition"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link
            href="/components/Admin/add-books"
            className="flex items-center gap-2 px-4 py-3 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition"
          >
            <PlusCircle className="w-5 h-5" />
            Add Books
          </Link>
          <Link
            href="/components/Admin/stock-managment"
            className="flex items-center gap-2 px-4 py-3 rounded-md text-white bg-green-500 hover:bg-green-600 transition"
          >
            <TrendingUp className="w-5 h-5" />
            Stock Management
          </Link>
          <Link
            href="/components/Admin/remove-books"
            className="flex items-center gap-2 px-4 py-3 rounded-md text-white bg-red-500 hover:bg-red-600 transition"
          >
            <MinusCircle className="w-5 h-5" />
            Remove Books
          </Link>
          <Link
            href="/components/Admin/order"
            className="flex items-center gap-2 px-4 py-3 rounded-md text-white bg-red-500 hover:bg-red-600 transition"
          >
            <MinusCircle className="w-5 h-5" />
            Order Details
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-3 rounded-md text-white bg-red-600 hover:bg-red-700 transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
