import books from "../../bookdata/book";
import BookTemplate from "../../BookTemplate";
import Footer from "../../footer";
import Navbar from "../../navbar";
export default function UsedBooks() {
  const bestSellerBooks = books.filter(
    (book) => book.category === "Best Seller"
  );

  return (
    <>
      <Navbar />
      <div className="flex flex-row justify-between">
        <div className="ml-28 flex flex-col mt-24 ">
          <p className="text-2xl font-bold">Best Seller</p>
          <p className="text-sm ">
            Find Your Next Great Read Among Our Best Sellers.
          </p>
        </div>
      </div>

      <BookTemplate noDesc noGenres noRating books={bestSellerBooks} />
      <Footer />
    </>
  );
}
