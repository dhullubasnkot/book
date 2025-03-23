"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

const Carousel = () => {
  const Data = [
    { id: 1, image: "/img1.webp" },
    { id: 2, image: "/img2.webp" },
    { id: 3, image: "/img3.webp" },
    { id: 4, image: "/img4.webp" },
    { id: 5, image: "/img5.webp" },
  ];

  return (
    <div className="w-full h-[300px] flex mt-[120px]">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={4}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        className="w-full h-[300px]"
      >
        {Data.map((item) => (
          <SwiperSlide key={item.id}>
            <Image
              height={250}
              width={250}
              src={item.image}
              alt={`Slide ${item.id}`}
              className="w-[400px] h-[250px] object-cover rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
