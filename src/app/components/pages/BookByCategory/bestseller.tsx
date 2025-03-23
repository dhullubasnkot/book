import Link from "next/link";
import books from "../bookdata/book";
import BookTemplate from "../BookTemplate";

export default function BestSeller() {
  const bestSellerBooks = books.filter(
    (book) => book.category === "Best Seller"
  );

  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="ml-28 flex flex-col ">
          <p className="text-2xl font-bold">Best Seller</p>
          <p className="text-sm ">
            Find Your Next Great Read Among Our Best Sellers.
          </p>
        </div>
        <Link
          href="/components/pages/AllTypesOfBook/BestSeller"
          className=" mr-20"
        >
          Show all
        </Link>
      </div>

      <BookTemplate
        showFour
        noPageCount
        noDesc
        noGenres
        noRating
        books={bestSellerBooks.slice(0, 5)}
      />
    </>
  );
}
