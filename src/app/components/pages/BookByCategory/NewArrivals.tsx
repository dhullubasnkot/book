import BookTemplate from "../BookTemplate";
import Books from "../bookdata/book";
import Link from "next/link";

export default function NewArrivals() {
  const NewArrivalsBooks = Books.filter(
    (book) => book.category === "New Arrival"
  ).map((book) => ({
    ...book,
    id: book.id.toString(),
  }));

  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="ml-28 flex flex-col ">
          <p className="text-2xl font-bold">New Arrivals</p>
          <p className="text-sm ">
            Explore Fresh Arrivals and Find Your Next Great Read.
          </p>
        </div>
        <Link
          href="/components/pages/AllTypesOfBook/NewArrivals"
          className=" mr-20"
        >
          Show all
        </Link>
      </div>

      <BookTemplate
        noDesc
        noGenres
        noRating
        showFour
        books={NewArrivalsBooks}
      />
    </>
  );
}
