import books from "../../bookdata/book";
import BookTemplate from "../../BookTemplate";
import Footer from "../../footer";
import Navbar from "../../navbar";
export default function BestSellerAll() {
  const NewArrivalsBooks = books.filter(
    (book) => book.category === "New Arrival"
  );

  return (
    <>
      <Navbar />
      <div className="flex flex-row justify-between">
        <div className="ml-28 flex flex-col mt-24 ">
          <p className="text-2xl font-bold">New Arrivals</p>
          <p className="text-sm ">
            Explore Fresh Arrivals and Find Your Next Great Read.
          </p>
        </div>
      </div>

      <BookTemplate noDesc noGenres noRating books={NewArrivalsBooks} />
      <Footer />
    </>
  );
}
