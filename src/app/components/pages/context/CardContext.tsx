"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  image: string;
}

interface CartContextType {
  cart: Book[];
  addToCart: (book: Book) => void;
  removeFromCart: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Book[]>([]);

  const addToCart = (book: Book) => {
    setCart((prevCart) => [...prevCart, book]);
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((book) => book.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
