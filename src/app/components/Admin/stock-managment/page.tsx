"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface Book {
  id: string;
  title: string;
  stock: number;
  price: number;
  image: string;
}

const StockManagement = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [newStock, setNewStock] = useState<{ [key: string]: number }>({});
  const [newTitle, setNewTitle] = useState<{ [key: string]: string }>({});
  const [newPrice, setNewPrice] = useState<{ [key: string]: number }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch("/api/books");
      const data = await res.json();
      setBooks(data.books);
    };
    fetchBooks();
  }, []);

  const handleStockChange = (bookId: string, value: number) => {
    setNewStock((prev) => ({
      ...prev,
      [bookId]: value,
    }));
  };

  const handleTitleChange = (bookId: string, value: string) => {
    setNewTitle((prev) => ({
      ...prev,
      [bookId]: value,
    }));
  };

  const handlePriceChange = (bookId: string, value: number) => {
    setNewPrice((prev) => ({
      ...prev,
      [bookId]: value,
    }));
  };

  const handleUpdate = async (bookId: string) => {
    const updatedStock =
      newStock[bookId] !== undefined ? newStock[bookId] : null;
    const updatedTitle = newTitle[bookId] || null;
    const updatedPrice = newPrice[bookId] || null;

    const updatedData: any = {};
    if (updatedStock !== null) updatedData.stock = updatedStock;
    if (updatedTitle !== null) updatedData.title = updatedTitle;
    if (updatedPrice !== null) updatedData.price = updatedPrice;

    const res = await fetch(`/api/books?bookId=${bookId}`, {
      method: "PUT",
      body: JSON.stringify(updatedData),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      alert("Book updated!");
      setBooks((prev) =>
        prev.map((book) =>
          book.id === bookId
            ? {
                ...book,
                stock: updatedStock ?? book.stock,
                title: updatedTitle ?? book.title,
                price: updatedPrice ?? book.price,
              }
            : book
        )
      );
    } else {
      const data = await res.json();
      alert(data.error || "Failed to update book.");
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
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Stock Management
      </h1>

      {/* Book List */}
      <div className="space-y-6">
        {books.length === 0 ? (
          <p className="text-xl text-center text-gray-500">
            No books available to manage.
          </p>
        ) : (
          books.map((book) => (
            <div
              key={book.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4">
                {/* Book Image */}
                <div className="relative">
                  <Image
                    src={book.image}
                    alt={book.title}
                    width={60}
                    height={90}
                    className="rounded-lg cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => openModal(book.image)} // Open modal on image click
                  />
                </div>

                <div>
                  <p className="text-xl font-medium text-gray-800">
                    {book.title}
                  </p>
                  <p className="text-sm text-gray-500">Stock: {book.stock}</p>
                  <p className="text-sm text-gray-500">Price: ${book.price}</p>
                </div>
              </div>

              {/* Inputs for updating book details */}
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  value={newTitle[book.id] || book.title} // Default to current title
                  onChange={(e) => handleTitleChange(book.id, e.target.value)}
                  className="border px-4 py-2 rounded-md w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Title"
                />

                <input
                  type="number"
                  // value={newPrice[book.id] || book.price} // Default to current price
                  onChange={(e) => handlePriceChange(book.id, +e.target.value)}
                  className="border px-4 py-2 rounded-md w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Price"
                />

                <input
                  type="number"
                  // value={newStock[book.id] || book.stock} // Default to current stock
                  onChange={(e) => handleStockChange(book.id, +e.target.value)}
                  className="border px-4 py-2 rounded-md w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Stock"
                />

                {/* Update Button */}
                <button
                  onClick={() => handleUpdate(book.id)}
                  className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-all"
                >
                  Update
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Image Modal (Viewer) */}
      {isModalOpen && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white p-4 rounded-lg max-w-3xl w-full">
            <button
              className="absolute top-2 right-2 text-gray-500 text-2xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <Image
              src={selectedImage}
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

export default StockManagement;
