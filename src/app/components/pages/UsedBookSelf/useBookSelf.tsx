"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Book {
  id: string;
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
}

export default function UsedBookShelf() {
  const [usedBooks, setUsedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/books?category=Used Books")
      .then((res) => res.json())
      .then((data) => {
        if (!data.books || data.books.length === 0) {
          setError("No used books found.");
        } else {
          setUsedBooks(data.books);
        }
      })
      .catch((err) => {
        setError("Error fetching used books.");
        console.error("Error fetching used books:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading books...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Used Books</h1>
      <p className="text-gray-600 mb-4">
        Explore the latest additions to our collection.
      </p>

      <div className="relative w-full max-w-4xl mt-48">
        <div className="relative">
          <Image
            src="/books/self.png"
            alt="Book Shelf"
            height={200}
            width={2000}
            className="rounded-md"
          />

          <div className="absolute top-[-11vw] flex gap-3 ml-16">
            {usedBooks.map((book) => (
              <div key={book.id} className="">
                <Link href={`/book/${book.id}`}>
                  <Image
                    src={book.image}
                    alt={book.title}
                    height={160}
                    width={120}
                    className="rounded-md shadow-lg"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 text-center">
          <Link href="/components/pages/AllTypesOfBook/UsedBooks">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Explore Books
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
