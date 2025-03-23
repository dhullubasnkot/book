import { Book } from "lucide-react";
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
  return (
    <div className="flex justify-center items-center py-5">
      <div className="flex flex-col w-[90vw] p-5">
        <div
          className="grid grid-cols-2 sm:grid-cols-3   gap-5 mt-5"
          style={{
            gridTemplateColumns: showFour ? "repeat(5, 1fr)" : "repeat(7, 1fr)",
          }}
        >
          {books.map((book) => (
            <div
              key={book.id}
              className="flex flex-col items-center p-3 transition hover:scale-105"
            >
              <Link href={`/book/${book.id}`}>
                <Image
                  src={book.image}
                  alt={book.title}
                  width={200}
                  height={280}
                  className="rounded-md"
                />
              </Link>

              <p className="text-center text-sm font-semibold mt-2">
                {book.title}
              </p>
              <p className="text-xs ">{book.author}</p>
              <p className="font-bold mt-1">Rs. {book.price}</p>
              {noDesc ? "" : <p className="text-xs">{book.details}</p>}
              {noGenres ? "" : <p className="text-xs">{book.genre}</p>}
              {noRating ? "" : <p className="text-xs">{book.rating}</p>}
              

              <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
