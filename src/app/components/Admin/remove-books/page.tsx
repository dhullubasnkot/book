"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const RemoveBooks = () => {
  interface Book {
    id: string;
    title: string;
    image: string;
    price: string;
    author: string;
    category: string;
    // Add other fields if needed (e.g., genres, description)
  }

  const [books, setBooks] = useState<Book[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    // Fetch all books
    const fetchBooks = async () => {
      const res = await fetch("/api/books");
      const data = await res.json();
      setBooks(data.books);
    };

    fetchBooks();
  }, []);

  const handleRemove = async (bookId: string) => {
    try {
      // Send DELETE request to API
      const res = await fetch(`/api/books?bookId=${bookId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        alert("Book removed successfully!");
        // Update the state to remove the book from the list
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
      } else {
        alert(data.error || "Failed to remove book.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while removing the book.");
    }
  };

  const openModal = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-700 mb-6">
        Remove Books
      </h1>

      {/* Book List */}
      <div className="space-y-6">
        {books.length === 0 ? (
          <p className="text-xl text-center text-gray-500">
            No books available to remove.
          </p>
        ) : (
          books.map((book) => (
            <div
              key={book.id}
              className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center space-x-4">
                {/* Book Image */}
                <Image
                  src={book.image}
                  alt={book.title}
                  width={60}
                  height={90}
                  className="rounded-lg cursor-pointer"
                  onClick={() => openModal(book.image)} // Open modal on image click
                />
                <div>
                  <p className="text-xl font-medium text-gray-800">
                    {book.title}
                  </p>
                  <p className="text-gray-600">Author: {book.author}</p>
                  <p className="text-gray-600">Category: {book.category}</p>
                  <p className="text-gray-600">Price: ${book.price}</p>
                </div>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => handleRemove(book.id)}
                className="bg-red-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-700 transition-all"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {/* Image Modal (Viewer) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white p-4 rounded-lg max-w-3xl w-full">
            <button
              className="absolute top-2 right-2 text-gray-500 text-2xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <Image
              src={selectedImage!}
              alt="Selected Book Image"
              width={800}
              height={1200}
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RemoveBooks;
