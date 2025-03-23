"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    name: "Arts & Photography",
    image: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
    link: "/arts",
  },
  {
    name: "Boxed Sets",
    image: "https://cdn-icons-png.flaticon.com/512/711/711897.png",
    link: "/boxed-sets",
  },
  {
    name: "Business & Investing",
    image: "https://cdn-icons-png.flaticon.com/512/3063/3063821.png",
    link: "/business",
  },
  {
    name: "Fiction & Literature",
    image: "https://cdn-icons-png.flaticon.com/512/1946/1946488.png",
    link: "/fiction",
  },
  {
    name: "Foreign Languages",
    image: "https://cdn-icons-png.flaticon.com/512/2875/2875404.png",
    link: "/languages",
  },
  {
    name: "History, Biography",
    image: "https://cdn-icons-png.flaticon.com/512/3523/3523074.png",
    link: "/history",
  },
  {
    name: "Kids & Teens",
    image: "https://cdn-icons-png.flaticon.com/512/1011/1011274.png",
    link: "/kids",
  },
  {
    name: "Learning & Reference",
    image: "https://cdn-icons-png.flaticon.com/512/1828/1828889.png",
    link: "/reference",
  },
];

const CustomPrevArrow = (props) => (
  <button
    {...props}
    className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 z-10 bg-gray-300 hover:bg-gray-400 rounded-full p-2 shadow-md transition"
  >
    <span className="block w-3 h-3 border-t-2 border-r-2 border-black transform rotate-[225deg]"></span>
  </button>
);

const CustomNextArrow = (props) => (
  <button
    {...props}
    className="absolute right-[-20px] top-1/2 transform -translate-y-1/2 z-10 bg-gray-300 hover:bg-gray-400 rounded-full p-2 shadow-md transition"
  >
    <span className="block w-3 h-3 border-t-2 border-r-2 border-black transform rotate-[-320deg]"></span>
  </button>
);

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 1,
  nextArrow: <CustomNextArrow />,
  prevArrow: <CustomPrevArrow />,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 5 } },
    { breakpoint: 768, settings: { slidesToShow: 4 } },
    { breakpoint: 640, settings: { slidesToShow: 3 } },
    { breakpoint: 480, settings: { slidesToShow: 2 } },
  ],
};

function CategoriesPage() {
  return (
    <div className="flex flex-col justify-center items-center py-5">
      <div className="text-center">
        <p className="text-2xl font-bold">Genres</p>
        <p className="text-sm ">
          Browse Our Extensive Collection of Books Across Different Genres.
        </p>
      </div>

      <div className="w-[90vw] mt-4">
        <Slider {...settings}>
          {categories.map((category, index) => (
            <div key={index} className="flex flex-col items-center">
              <Link href={category.link}>
                <div className="flex flex-col ml-8 items-center justify-center w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32  rounded-full  transition">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={50}
                    height={50}
                    className=""
                  />
                </div>
                <p className="text-center text-sm mt-2 ">{category.name}</p>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default CategoriesPage;
