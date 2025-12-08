import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import homeData from "../../data/homeData.json";

const BrandSlider = () => {
    const { logos } = homeData.brandSlider;

    return (
        <div className="bg-gray-100 py-10 w-full">
            <Swiper
                modules={[Autoplay, Navigation]}
                spaceBetween={20}
                slidesPerView={6}
                autoplay={{ delay: 1500, disableOnInteraction: false }}
                loop={true}
                navigation={true}
                breakpoints={{
                    1280: { slidesPerView: 6 },
                    1024: { slidesPerView: 4 },
                    768: { slidesPerView: 3 },
                    480: { slidesPerView: 2 }
                }}
                className="w-full max-w-7xl mx-auto"
            >
                {logos.map((brand) => (
                    <SwiperSlide key={brand.id} className="flex justify-center items-center">
                        <img
                            src={brand.logo}
                            alt={brand.name}
                            className="w-28 h-12 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default BrandSlider;
