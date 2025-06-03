"use client";
import { useCart } from "./context/CardContext";
import Image from "next/image";
import Link from "next/link";

export default function BookTemplate({
  books,
  showFour,
  noDesc,
  noGenres,
  noRating,
}: {
  books: any;
  showFour?: boolean;
  noDesc?: boolean;
  noGenres?: boolean;
  noRating?: boolean;
}) {
  const { addToCart } = useCart(); // Access the cart context

  return (
    <div className="flex justify-center items-center py-5">
      <div className="flex flex-col w-[90vw] p-5">
        <div
          className="grid grid-cols-2 sm:grid-cols-3 gap-5 mt-5"
          style={{
            gridTemplateColumns: showFour ? "repeat(5, 1fr)" : "repeat(5, 1fr)",
          }}
        >
          {books.map((book) => (
            <div
              key={book.id}
              className="flex flex-col items-center p-3 transition hover:scale-105"
            >
              <Link href={`/book/${book.id}`}>
                <Image
                  src={
                    book.image?.startsWith("/") ||
                    book.image?.startsWith("http")
                      ? book.image
                      : "/default-book.png"
                  }
                  alt={book.title}
                  width={200}
                  height={280}
                  className="rounded-md"
                />
              </Link>

              <p className="text-center text-sm font-semibold mt-2">
                {book.title}
              </p>
              <p className="text-xs">{book.author}</p>
              <p className="font-bold mt-1">Rs. {book.price}</p>
              {noDesc ? "" : <p className="text-xs">{book.details}</p>}
              {noGenres ? "" : <p className="text-xs">{book.genre}</p>}
              {noRating ? "" : <p className="text-xs">{book.rating}</p>}

              {/* Stock Status */}
              <p
                className={`text-sm mt-1 ${
                  book.stock === 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                {book.stock === 0 ? "Out of Stock" : `In Stock`}
              </p>

              {/* Add to Cart Button */}
              <button
                onClick={() => addToCart(book)} // Add book to cart on click
                disabled={book.stock === 0} // Disable if out of stock
                className={`mt-2 px-3 py-1 rounded hover:bg-blue-700 ${
                  book.stock === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white"
                }`}
              >
                {book.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
// booktemplate
