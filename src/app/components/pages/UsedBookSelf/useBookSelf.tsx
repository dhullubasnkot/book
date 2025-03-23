import Link from "next/link";
import Books from "../bookdata/book";
import Image from "next/image";
export default function UsedBookShelf() {
  const newArrivals = Books.filter((book) => book.category === "New Arrival");
  console.log(newArrivals);

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
            {newArrivals.map((book) => (
              <div key={book.category} className=" ">
                <Link href="/book/[id]" as={`/book/${book.id}`}>
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
          <Link href="/components\pages\AllTypesOfBook\UsedBooks">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Explore Books
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
