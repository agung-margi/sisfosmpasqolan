import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

const GaleriContainer = ({ images }) => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-6 pb-8">Galeri</h1>
      <div className="flex flex-wrap justify-center">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={3}
          navigation
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {images.map((image, index) => (
            <SwiperSlide
              key={index}
              className="bg-gray-200 rounded-lg overflow-hidden shadow-lg shadow-gray-600 w-96"
            >
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="w-full h-auto"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default GaleriContainer;
