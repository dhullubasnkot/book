import Link from "next/link";
import Image from "next/image";

export default function OurPicks() {
  return (
    <div className="flex justify-center items-center py-10 px-6">
      <div className="flex flex-col md:flex-row items-center  overflow-hidden w-full">
        <div className="flex flex-col items-center p-8 w-full md:w-1/2 text-center">
          <h1 className="text-3xl font-bold  mb-4">Our Picks</h1>
          <p className=" mb-3">
            We will curate special book recommendations for you based on your
            genre preferences.
          </p>
          <p className=" mb-6">Login or create an account to get started.</p>
          <Link href="/auth">
            <button className="px-6 py-2 bg-blue-600  font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
              Login | Register
            </button>
          </Link>
        </div>

        <div className="w-[800px] h-[225px]">
          <Image
            src="/books/ourPicks.webp"
            alt="Our Picks"
            height={225}
            width={400}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
