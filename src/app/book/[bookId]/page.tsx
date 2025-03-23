import Books from "@/app/components/pages/bookdata/book";
import Navbar from "@/app/components/pages/navbar";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  BookMarked,
  LucideLink,
  Book,
} from "lucide-react";
export default function BookDetails({
  params,
}: {
  params: { bookId: string };
}) {
  const requiredBook = Books.find((book) => book.id === Number(params.bookId));

  if (!requiredBook) {
    return <div className="text-center text-red-500 mt-10">Book not found</div>;
  }
  const noPageCount = !requiredBook.pageCount;
  const noWeight = !requiredBook.weight;
  const noLanguages = !requiredBook.languages;

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 mt-20 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex justify-center">
            <Image
              src={requiredBook.image}
              alt={requiredBook.title}
              height={400}
              width={300}
              className="w-64 h-auto shadow-lg rounded-md"
            />
          </div>

          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold">{requiredBook.title}</h1>
            <p className=" text-lg mb-2">by {requiredBook.author}</p>
            <p className="text-yellow-500 font-semibold">
              ⭐ {requiredBook.rating} / 5
            </p>

            <h2 className="text-xl font-semibold mt-4">Synopsis</h2>
            <p className="">{requiredBook.description}</p>

            <div className="mt-4">
              <h2 className="text-lg font-semibold">Genres:</h2>
              <div className="flex flex-wrap gap-2 mt-1">
                {requiredBook.genres.map((genre, index) => (
                  <span key={index} className="px-3 py-1 text-sm  rounded-full">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex space-x-4 ml-20 mt-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook className="w-6 h-6 text-blue-600 hover:text-blue-800 transition duration-300" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="w-6 h-6 text-blue-400 hover:text-blue-600 transition duration-300" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="w-6 h-6 text-pink-500 hover:text-pink-700 transition duration-300" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BookMarked className="w-6 h-6 text-blue-700 hover:text-blue-900 transition duration-300" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LucideLink className="w-6 h-6 text-red-600 hover:text-red-800 transition duration-300" />
          </a>
        </div>
        {!noPageCount && (
          <div className="rounded-lg ml-[20px] w-[600px] mb-60 mt-10">
            <div className="flex flex-row items-center gap-8">
              {/* Page Count Section */}
              <div className="flex flex-col items-center h-[95px] w-[130px] border-2">
                <p className="text-sm font-semibold">Page Count</p>
                <div className="p-3 rounded-full bg-gray-100">
                  <Book size={24} className="" />
                </div>
                <p className="mt-2 text-xs ">{requiredBook.pageCount} Pages</p>
              </div>

              {/* ISBN Section */}
              <div className="flex flex-col items-center h-[95px] w-[130px] border-2">
                <p className="text-sm font-semibold ">ISBN</p>
                <div className="p-3 rounded-full bg-gray-100">
                  <span className="text-gray-600">📚</span>
                </div>
                <p className="mt-2 text-xs ">{requiredBook.isbn}</p>
              </div>

              {/* Weight Section */}
              {!noWeight && (
                <div className="flex flex-col items-center h-[95px] w-[130px] border-2">
                  <p className="text-sm font-semibold ">Weight</p>
                  <div className="p-3 rounded-full bg-gray-100">
                    <span className="">⚖️</span>
                  </div>
                  <p className="mt-2 text-xs ">{requiredBook.weight} kg</p>
                </div>
              )}

              {/* Languages Section */}
              {!noLanguages && (
                <div className="flex flex-col items-center h-[95px] w-[130px] border-2">
                  <p className="text-sm font-semibold ">Languages</p>
                  <div className="p-3 rounded-full bg-gray-100">
                    <span className="">🌍</span>
                  </div>
                  <p className="mt-2 text-xs">{requiredBook.languages}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
