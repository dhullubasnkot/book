"use client";
import { useCart } from "../context/CardContext";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cart.map((book) => (
            <div
              key={book.id}
              className="border p-3 flex flex-col items-center"
            >
              <Link href={`/book/${book.id}`}>
                <Image
                  src={book.image}
                  alt={book.title}
                  width={150}
                  height={200}
                  className="rounded-md"
                />
              </Link>
              <p className="font-semibold mt-2">{book.title}</p>
              <p className="text-xs">{book.author}</p>
              <p className="font-bold mt-1">Rs. {book.price}</p>

              <button
                onClick={() => removeFromCart(book.id)}
                className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Remove from Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
