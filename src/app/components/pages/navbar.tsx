"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  User,
  ChevronDown,
  ShoppingBasket,
  SunIcon,
  MoonIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Books from "./bookdata/book";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<"books" | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dropdownRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredBooks([]);
      return;
    }

    const results = Books.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.genres.some((genre) => genre.toLowerCase().includes(query))
    );

    setFilteredBooks(results);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(null);
      }
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  //for dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "false");
    }
  };

  return (
    <>
      <nav className=" dark:bg-gray-800 shadow-md py-3 px-6 fixed top-0 w-full z-50 h-[72px]">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          {/* Logo */}
          <Link href={"/"}>
            <div>
              <Image
                src="/logo.png"
                alt="Book-US"
                width={150}
                height={100}
                className="cursor-pointer"
              />
            </div>
          </Link>

          {/* Desktop Menu */}
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
                      Children's Books
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
            <li className=" text-xl hover:text-gray-500 cursor-pointer">
              Deals
            </li>
          </ul>

          {/* Search Bar */}
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

            {/* Search Results */}
            {searchQuery && filteredBooks.length > 0 && (
              <ul className="absolute bg-white dark:bg-gray-800 shadow-lg rounded-md w-full mt-1">
                {filteredBooks.map((book) => (
                  <li
                    key={book.id}
                    className="p-3 text-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <Link href={`/book/${book.id}`}>
                      {book.title} - {book.author}-
                      <Image
                        src={book.image}
                        alt={book}
                        width={30}
                        height={40}
                        className="rounded-md shadow-lg"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button className=" text-xl px-3 py-1 hover:underline dark:text-gray-200">
              Login
            </button>
            <ShoppingBasket
              size={30}
              className="cursor-pointer hover:text-gray-500 dark:hover:text-gray-400"
            />
            <User
              size={25}
              className="cursor-pointer hover:text-gray-500 dark:hover:text-gray-400"
            />
            <button className="border text-xl px-3 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              NPR
            </button>

            {/* Dark Mode*/}
            <button onClick={toggleDarkMode} className="ml-4 p-2 rounded-full ">
              {isDarkMode ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
