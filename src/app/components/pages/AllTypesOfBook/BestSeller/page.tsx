"use client";
import { useEffect, useState } from "react";
import BookTemplate from "../../BookTemplate";
import Footer from "../../footer";
import Navbar from "../../navbar";

interface Book {
  title: string;
  category: string;
  price: number;
  discountPrice: number;
  pageCount: number;
  weight: number;
  isbn: string;
  author: string;
  description: string;
  genres: string;
  language: string;
  image: string;
  stock: number; // ✅ Added stock
}

export default function BestSellerAll() {
  const [bestSellerBooks, setBestSellerBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/books?category=Best Seller")
      .then((res) => res.json())
      .then((data) => {
        if (!data.books || data.books.length === 0) {
          setError("No books found in this category.");
        } else {
          setBestSellerBooks(data.books);
        }
      })
      .catch((err) => {
        setError("Error fetching books.");
        console.error("Error fetching books:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center min-h-screen">
          <p>Loading books...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center min-h-screen">
          <p>{error}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-row justify-between">
        <div className="ml-28 flex flex-col mt-24">
          <p className="text-2xl font-bold">Best Seller</p>
          <p className="text-sm">
            Find Your Next Great Read Among Our Best Sellers.
          </p>
        </div>
      </div>

      <BookTemplate noDesc noGenres noRating books={bestSellerBooks} />

      <Footer />
    </>
  );
}
