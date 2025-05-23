"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AdminDashboard = () => {
  const router = useRouter();
  const [book, setBook] = useState({
    title: "",
    category: "",
    price: "",
    discountPrice: "",
    pageCount: "",
    weight: "",
    isbn: "",
    author: "",
    description: "",
    genres: "",
    language: "",
    stock: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formError, setFormError] = useState(""); // State for form error message

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(""); // Reset error on new submission

    // Basic form validation
    if (
      !book.title ||
      !book.category ||
      !book.price ||
      !book.description ||
      !book.stock ||
      !imageFile
    ) {
      setFormError("Please fill in all required fields and select an image.");
      return;
    }

    const formData = new FormData();
    Object.entries(book).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const res = await fetch("/api/books", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("Book added successfully!");
        router.refresh();
        // Reset form
        setBook({
          title: "",
          category: "",
          price: "",
          discountPrice: "",
          pageCount: "",
          weight: "",
          isbn: "",
          author: "",
          description: "",
          genres: "",
          language: "",
          stock: "",
        });
        setImageFile(null);
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      alert("Network error or server unavailable.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-lg shadow-md space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800">Add New Book</h2>

      {formError && <p className="text-red-500 text-sm">{formError}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleChange}
            placeholder="Title"
            required
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="category"
            name="category"
            onChange={handleChange}
            placeholder="Category"
            required
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="price"
            name="price"
            onChange={handleChange}
            placeholder="Price"
            required
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="discountPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Discount Price
          </label>
          <input
            type="number"
            id="discountPrice"
            name="discountPrice"
            onChange={handleChange}
            placeholder="Discount Price"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="pageCount"
            className="block text-sm font-medium text-gray-700"
          >
            Page Count
          </label>
          <input
            type="number"
            id="pageCount"
            name="pageCount"
            onChange={handleChange}
            placeholder="Page Count"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="weight"
            className="block text-sm font-medium text-gray-700"
          >
            Weight
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            onChange={handleChange}
            placeholder="Weight"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="isbn"
            className="block text-sm font-medium text-gray-700"
          >
            ISBN
          </label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            onChange={handleChange}
            placeholder="ISBN"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-700"
          >
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            onChange={handleChange}
            placeholder="Author"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="genres"
            className="block text-sm font-medium text-gray-700"
          >
            Genres
          </label>
          <input
            type="text"
            id="genres"
            name="genres"
            onChange={handleChange}
            placeholder="Genres"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="language"
            className="block text-sm font-medium text-gray-700"
          >
            Language
          </label>
          <input
            type="text"
            id="language"
            name="language"
            onChange={handleChange}
            placeholder="Language"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          placeholder="Description"
          required
          className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          rows={4}
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="stock"
          className="block text-sm font-medium text-gray-700"
        >
          Stock <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="stock"
          name="stock"
          onChange={handleChange}
          placeholder="Stock"
          required
          className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-700"
        >
          Book Image <span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleFileChange}
          required
          className="mt-1 block w-full text-sm text-gray-500
                    file:bg-gray-50 file:border-0
                    file:py-2 file:px-4
                    file:rounded-md file:mr-4
                    focus:outline-none focus:ring-2 focus:ring-indigo-500
                    "
        />
      </div>
      <button
        type="submit"
        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300"
      >
        Add Book
      </button>
    </form>
  );
};

export default AdminDashboard;
