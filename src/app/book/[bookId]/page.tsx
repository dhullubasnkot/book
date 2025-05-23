"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/components/pages/navbar";
import Image from "next/image";
import { useCart } from "@/app/components/pages/context/CardContext";
import {
  Facebook,
  Twitter,
  Instagram,
  BookMarked,
  LucideLink,
  Book,
} from "lucide-react";

// Type for book object
interface BookType {
  id: string;
  title: string;
  author: string;
  price: number;
  image: string;
  description: string;
  genres?: string;
  stock: number;
  pageCount?: number;
  weight?: number;
  language?: string;
  isbn?: string;
}

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState<BookType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`/api/books?bookId=${bookId}`);
        if (!res.ok) throw new Error("Failed to fetch book data");
        const data = await res.json();
        setBook(data.book);
      } catch (err) {
        console.error(err);
        setError("Error fetching book data");
      } finally {
        setLoading(false);
      }
    };

    if (bookId) fetchBook();
  }, [bookId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500" />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="text-center text-red-500 mt-10">
        {error || "Book not found"}
      </div>
    );
  }

  const { title, author, description, genres, image, stock } = book;

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Book Image */}
          <div className="flex justify-center">
            <Image
              src={image}
              alt={title}
              height={400}
              width={300}
              className="w-64 h-auto shadow-lg rounded-md"
            />
          </div>

          {/* Book Info */}
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-lg mb-2">by {author}</p>

            <h2 className="text-xl font-semibold mt-4">Synopsis</h2>
            <p>{description}</p>

            {genres && (
              <div className="mt-4">
                <h2 className="text-lg font-semibold">Genres:</h2>
                <div className="flex flex-wrap gap-2 mt-1">
                  {genres.split(",").map((genre, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-sm px-3 py-1 rounded-full"
                    >
                      {genre.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <button
              onClick={() => addToCart(book)}
              disabled={stock === 0}
              className={`mt-4 px-4 py-2 rounded shadow-md transition duration-200 ${
                stock === 0
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4 ml-20 mt-6">
          {[Facebook, Twitter, Instagram, BookMarked, LucideLink].map(
            (Icon, i) => (
              <Icon
                key={i}
                className="w-6 h-6 text-gray-500 hover:text-gray-700 transition duration-300"
              />
            )
          )}
        </div>

        {/* Additional Book Info */}
        {(book.pageCount || book.weight || book.language) && (
          <div className="rounded-lg ml-[20px] w-[600px] mb-60 mt-10">
            <div className="flex flex-row items-center gap-8">
              {book.pageCount && (
                <InfoCard
                  label="Page Count"
                  icon={<Book size={24} />}
                  value={`${book.pageCount} Pages`}
                />
              )}
              {book.isbn && (
                <InfoCard label="ISBN" icon={"📚"} value={book.isbn} />
              )}
              {book.weight && (
                <InfoCard
                  label="Weight"
                  icon={"⚖️"}
                  value={`${book.weight} kg`}
                />
              )}
              {book.language && (
                <InfoCard label="Language" icon={"🌍"} value={book.language} />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

// Info card reusable component
interface InfoCardProps {
  label: string;
  icon: React.ReactNode;
  value: string;
}

const InfoCard = ({ label, icon, value }: InfoCardProps) => (
  <div className="flex flex-col items-center h-[95px] w-[130px] border-2 rounded-lg shadow-sm">
    <p className="text-sm font-semibold">{label}</p>
    <div className="p-3 rounded-full bg-gray-100 mt-1">{icon}</div>
    <p className="mt-2 text-xs text-center">{value}</p>
  </div>
);

export default BookDetails;
