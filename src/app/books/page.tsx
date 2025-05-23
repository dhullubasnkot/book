// "use client";
// import React, { useEffect, useState } from "react";
// import BookTemplate from "../components/pages/BookTemplate";

// const BooksPage = () => {
//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const res = await fetch("/api/books");
//         const data = await res.json();
//         setBooks(data);
//       } catch (err) {
//         console.error("Error fetching books:", err);
//       }
//     };

//     fetchBooks();
//   }, []);

//   return (
//     <div>
//       <h1 className="text-3xl font-bold text-center my-6">Books</h1>
//       <BookTemplate books={books} />
//     </div>
//   );
// };

// export default BooksPage;
