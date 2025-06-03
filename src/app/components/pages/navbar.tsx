"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronDown,
  ShoppingBasket,
  SunIcon,
  MoonIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Books from "./bookdata/book";
import { useCart } from "./context/CardContext";

export default function Navbar() {
  const { cart } = useCart();
  const [dropdownOpen, setDropdownOpen] = useState<"books" | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const dropdownRef = useRef(null);

  interface User {
    name: string;
    role?: string;
  }

  interface Book {
    id: string | number;
    title: string;
    author: string;
    image: string;
    genres: string[];
  }

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && typeof parsedUser.name === "string") {
          setUser(parsedUser);
        } else {
          console.warn("Invalid user data in localStorage:", parsedUser);
          setUser(null);
        }
      } catch (err) {
        console.error("Failed to parse user data:", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "false");
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (!query.trim()) {
      setFilteredBooks([]);
      return;
    }

    const results = (Books as Book[]).filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.genres.some((genre) => genre.toLowerCase().includes(query))
    );

    setFilteredBooks(results);
  };

  return (
    <nav className="dark:bg-gray-800 shadow-md py-3 px-6 fixed top-0 w-full z-50 h-[72px]">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Book-US"
            width={150}
            height={100}
            className="cursor-pointer"
          />
        </Link>

        {/* Menu */}
        <ul className="hidden md:flex gap-6 items-center">
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={() =>
                setDropdownOpen(dropdownOpen === "books" ? null : "books")
              }
              className="flex text-xl items-center gap"
            >
              Books <ChevronDown size={16} />
            </button>
            <AnimatePresence>
              {dropdownOpen === "books" && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute left-0 mt-2 w-44 bg-white dark:bg-gray-800 shadow-lg rounded-md border"
                >
                  <li className="p-3 text-lg text-black cursor-pointer">
                    Fiction
                  </li>
                  <li className="p-3 text-lg text-black cursor-pointer">
                    Non-fiction
                  </li>
                  <li className="p-3 text-lg text-black cursor-pointer">
                    Children&apos;s Books
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
          <li className="text-xl hover:text-gray-500 cursor-pointer">Deals</li>
        </ul>

        {/* Search */}
        <div className="relative w-[350px] hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border rounded-full pl-10"
            value={searchQuery}
            onChange={handleSearch}
          />
          <Search
            size={16}
            className="absolute left-3 top-3 text-gray-500 dark:text-gray-400"
          />
          {searchQuery && filteredBooks.length > 0 && (
            <ul className="absolute bg-white dark:bg-gray-800 shadow-lg rounded-md w-full mt-1 z-50 max-h-[300px] overflow-y-auto">
              {filteredBooks.map((book) => (
                <li
                  key={book.id}
                  className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <Image
                    src={book.image}
                    alt={book.title}
                    width={30}
                    height={40}
                    className="rounded-md shadow-sm"
                  />
                  <Link href={`/book/${book.id}`}>
                    {book.title} - {book.author}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right Side: Cart & Auth */}
        <div className="flex items-center gap-4">
          <Link href="/components/pages/cart" className="relative">
            <ShoppingBasket
              size={30}
              className="cursor-pointer hover:text-gray-500 dark:hover:text-gray-400"
            />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-xs text-white px-2 py-1 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>

          {/* Auth Section */}
          {user ? (
            <div className="relative group">
              <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center uppercase cursor-pointer">
                {user?.name?.[0]?.toUpperCase() || "U"}
              </div>
              <div className="absolute top-full right-0 bg-white dark:bg-gray-800 shadow-md rounded mt-2 hidden group-hover:block">
                <Link href="/components/pages/userprofile">
                  <button className="block px-4 py-2 text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                    View Profile
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Logout
                </button>
                {user.role === "admin" && (
                  <Link href="/components/Admin">
                    <button className="block px-4 py-2 text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Admin Panel
                    </button>
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <Link href="/login">
              <button className="text-xl px-3 py-1 hover:underline dark:text-gray-200">
                Login
              </button>
            </Link>
          )}
{/* button */}
          <button className="border text-xl px-3 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            NPR
          </button>

          <button onClick={toggleDarkMode} className="ml-4 p-2 rounded-full">
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </nav>
  );
}
