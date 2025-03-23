"use client"; // If you're using Next.js 13+ App Router

import { useRouter } from "next/navigation"; 
import Image from "next/image";

export default function NotFoundCatchAll() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6 bg-gray-100">
      <div className="relative w-[400px] h-[400px]">
        <Image
          src="/errors.gif"
          alt="404 Not Found"
          height={500}
          width={500}
          className="rounded-lg h-full w-full object-cover"
        />
      </div>
      <h1 className="text-4xl font-bold text-gray-800 mt-6">Oops! Page Not Found</h1>
      <p className="text-lg text-gray-600 mt-2">The page you're looking for doesn't exist.</p>
      <button
        onClick={() => router.push("/")}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Go Back Home
      </button>
    </div>
  );
}
