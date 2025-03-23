import AuthorData from "./bookdata/authorData";
import Image from "next/image";

interface Author {
  id: number;
  name: string;
  image: string;
  description: string;
}

interface BestAuthorProps {
  noDesc: boolean;
}

export default function BestAuthor({ noDesc }: BestAuthorProps) {
  return (
    <div className=" flex justify-center">
      <div className="flex flex-col items-center p-6  w-[1075px] justify-center">
        <h1 className="text-3xl font-bold  mb-2">Bestselling Authors</h1>
        <p className="text-lg  text-center mb-6">
          Discover books by bestselling authors in our collection, ranked by
          popularity.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-9 gap-8">
          {AuthorData.map((author: Author) => (
            <div key={author.id} className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden">
                <Image
                  src={author.image}
                  alt={author.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-lg font-semibold  mb-2 ml-7">{author.name}</p>
              {noDesc && (
                <p className="mt-2 text-sm text-gray-500">
                  {author.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
