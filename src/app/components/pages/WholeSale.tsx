import Image from "next/image";
import Link from "next/link";
export default function WholeSale() {
  return (
    <div className="flex justify-center p-6">
      <Link href="https://booksmandala.com/wholesale" target="_blank">
        <Image
          src="/books/wholesale.webp"
          alt="Whole Sale"
          height={300}
          width={1000}
          className="rounded-md"
        />
      </Link>
    </div>
  );
}
