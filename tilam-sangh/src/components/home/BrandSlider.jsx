import React, { useRef } from "react";
import { getAssetUrl } from '../../utils/imageHandler';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const BrandSlider = ({ data = {} }) => {
    const logos = data?.logos || [];
    const swiperRef = useRef(null);

    return (
        <div className="bg-gray-100 py-10 w-full relative">

            {/* Custom Navigation Buttons */}
            <button
                className="absolute left-5 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-md hover:bg-gray-200 transition"
                onClick={() => swiperRef.current?.slidePrev()}
            >
                <FaChevronLeft size={18} />
            </button>

            <button
                className="absolute right-5 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-md hover:bg-gray-200 transition"
                onClick={() => swiperRef.current?.slideNext()}
            >
                <FaChevronRight size={18} />
            </button>

            <Swiper
                modules={[Autoplay, Navigation, FreeMode]}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                freeMode={true}
                loop={true}
                speed={2500}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                }}
                navigation={false}  // disable default arrows
                slidesPerView={6}
                spaceBetween={20}
                breakpoints={{
                    1280: { slidesPerView: 6 },
                    1024: { slidesPerView: 5 },
                    768: { slidesPerView: 3 },
                    480: { slidesPerView: 2 },
                }}
                className="max-w-5xl mx-auto w-full"
            >
                {[...logos, ...logos].map((brand, index) => (
                    <SwiperSlide key={index} className="flex justify-center items-center select-none">
                        <img
                            src={getAssetUrl(brand.logo)}
                            alt={brand.name}
                            className="w-36 h-20 object-contain hover:scale-105 transition-all duration-300"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default BrandSlider;





// import React, { useRef } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation, FreeMode } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/navigation";

// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import homeData from "../../data/homeData.json";

// const BrandSlider = () => {
//     const { logos } = homeData.brandSlider;
//     const swiperRef = useRef(null);

//     return (
//         <div className="bg-gray-100 py-10 w-full relative">
//             {/* Custom Navigation Buttons */}
//             <button
//                 className="absolute left-5 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-md hover:bg-gray-200 transition"
//                 onClick={() => swiperRef.current.slidePrev()}
//             >
//                 <FaChevronLeft size={18} />
//             </button>

//             <button
//                 className="absolute right-5 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-md hover:bg-gray-200 transition"
//                 onClick={() => swiperRef.current.slideNext()}
//             >
//                 <FaChevronRight size={18} />
//             </button>

//             <Swiper
//                 modules={[Autoplay, Navigation, FreeMode]}
//                 onSwiper={(swiper) => (swiperRef.current = swiper)}
//                 freeMode={true}
//                 loop={true}
//                 speed={2500}                    // smooth continuous speed
//                 autoplay={{
//                     delay: 0,                     // continuous without stopping
//                     disableOnInteraction: false,
//                 }}
//                 slidesPerView={6}
//                 spaceBetween={20}
//                 breakpoints={{
//                     1280: { slidesPerView: 6 },
//                     1024: { slidesPerView: 5 },
//                     768: { slidesPerView: 3 },
//                     480: { slidesPerView: 2 },
//                 }}
//                 allowTouchMove={true}
//                 className="max-w-5xl mx-auto w-full"
//             >
//                 {logos.map((brand) => (
//                     <SwiperSlide key={brand.id} className="flex justify-center items-center select-none">
//                         <img
//                             src={brand.logo}
//                             alt={brand.name}
//                             className="w-36 h-20 object-contain hover:scale-105 transition-all duration-300"
//                         />
//                     </SwiperSlide>
//                 ))}
//             </Swiper>
//         </div>
//     );
// };

// export default BrandSlider;





// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation, FreeMode } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/free-mode";

// import homeData from "../../data/homeData.json";

// const BrandSlider = () => {
//     const { logos } = homeData.brandSlider;

//     return (
//         <div className="bg-gray-100 py-10 w-full relative">
//             <Swiper
//                 modules={[Autoplay, Navigation, FreeMode]}
//                 freeMode={true}
//                 loop={true}
//                 speed={1000} // speed of continuous scrolling
//                 autoplay={{
//                     delay: 0,
//                     disableOnInteraction: false,
//                     reverseDirection: false, // scroll left to right? set true
//                 }}
//                 navigation={true}
//                 slidesPerView={6}
//                 spaceBetween={30}
//                 breakpoints={{
//                     1280: { slidesPerView: 6 },
//                     1024: { slidesPerView: 5 },
//                     768: { slidesPerView: 3 },
//                     480: { slidesPerView: 2 }
//                 }}
//                 className="w-full max-w-5xl mx-auto"
//             >
//                 {logos.map((brand) => (
//                     <SwiperSlide key={brand.id} className="flex justify-center items-center">
//                         <img
//                             src={brand.logo}
//                             alt={brand.name}
//                             className="w-28 h-12 object-contain hover:scale-105 transition-all duration-300"
//                         />
//                     </SwiperSlide>
//                 ))}
//             </Swiper>
//         </div>
//     );
// };

// export default BrandSlider;







// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";
// import homeData from "../../data/homeData.json";

// const BrandSlider = () => {
//     const { logos } = homeData.brandSlider;

//     return (
//         <div className="bg-gray-100 py-10 w-full">
//             <Swiper
//                 modules={[Autoplay, Navigation]}
//                 spaceBetween={20}
//                 slidesPerView={6}
//                 autoplay={{ delay: 1500, disableOnInteraction: false }}
//                 loop={true}
//                 navigation={true}
//                 breakpoints={{
//                     1280: { slidesPerView: 6 },
//                     1024: { slidesPerView: 4 },
//                     768: { slidesPerView: 3 },
//                     480: { slidesPerView: 2 }
//                 }}
//                 className="w-full max-w-7xl mx-auto"
//             >
//                 {logos.map((brand) => (
//                     <SwiperSlide key={brand.id} className="flex justify-center items-center">
//                         <img
//                             src={brand.logo}
//                             alt={brand.name}
//                             className="w-28 h-12 object-contain grayscale-0 hover:grayscale-0 transition-all duration-300"
//                         />
//                     </SwiperSlide>
//                 ))}
//             </Swiper>
//         </div>
//     );
// };

// export default BrandSlider;
