import React from "react";
import { FaRegHandPointRight } from "react-icons/fa";
import { getAssetUrl } from '../../utils/imageHandler';


import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function CooperativeCampaignSlider({ data }) {
  const { slides, sidebar, footer } = data;

  return (
    <section className="w-full bg-[#fbd067] pb-0">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4 p-2">

        {/* LEFT SLIDER */}
        <div className="lg:col-span-3 rounded-xl overflow-hidden">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            loop
            autoplay={{ delay: 4000, disableOnInteraction: false }}
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <img
                  src={getAssetUrl(slide.image)}
                  className="w-full h-[450px] object-cover"
                  alt={`slide-${index}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* RIGHT STATIC SIDEBAR */}
        <div className="flex max-md:flex-row flex-col justify-between gap-4">

          {/* TOP CARD */}
          <div className="bg-[#3b3b3b] rounded-xl overflow-hidden p-3 flex flex-col items-center">
            <img
              src={getAssetUrl(sidebar.topImage)}
              className="w-36 rounded-xl"
              alt="CM"
            />
          </div>

          {/* BOTTOM CARD */}
          <div className="bg-[#3b3b3b] rounded-xl overflow-hidden p-3 flex flex-col items-center">
            <img
              src={getAssetUrl(sidebar.bottomImage)}
              className="w-36 rounded-xl"
              alt="Minister"
            />
          </div>

        </div>
      </div>

      {/* FOOTER BAR WITH INFINITE MARQUEE */}
      <div className="bg-[#fbd067] w-full flex items-center justify-between px-0 py-0 border-t border-black/20">
        <div className="bg-[#4E4949] py-3 px-4 w-1/3">
          <span className=" text-[#fbd067] text-xl font-semibold flex max-md:flex-col max-md:items-start items-center gap-2">
            <FaRegHandPointRight size={25} /> {footer.left}
          </span>
        </div>

        {/* Marquee animation */}
        <div className="overflow-hidden whitespace-nowrap w-2/3">
          <div className="whitespace-nowrap animate-marquee text-[#2b2b2b] text-lg font-semibold">
            {footer.right}
          </div>
        </div>
      </div>

      {/* MARQUEE KEYFRAMES */}
      <style>
        {`
  /* ------------------------------
      MARQUEE ANIMATION
  ------------------------------ */
  @keyframes marquee {
    0% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
  }
  .animate-marquee {
    display: inline-block;
    animation: marquee 20s linear infinite;
  }


  /* ------------------------------
      CUSTOM SWIPER ARROW GLOW EFFECT
  ------------------------------ */

  /* Base arrow style */
  .swiper-button-next,
  .swiper-button-prev {
    width: 45px !important;
    height: 45px !important;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.25) !important;  /* subtle white glow */
    backdrop-filter: blur(6px);                       /* glass blur effect */
    box-shadow: 0 0 16px rgba(255, 255, 255, 0.45);   /* soft glow */
    transition: 0.25s ease-out;
  }

  /* Arrow icon styling */
  .swiper-button-next::after,
  .swiper-button-prev::after {
    color: #ffffff;
    font-size: 22px !important;
    font-weight: bold;
  }

  /* Hover glow effect */
  .swiper-button-next:hover,
  .swiper-button-prev:hover {
    background: rgba(255, 255, 255, 0.35) !important;
    box-shadow: 0 0 28px rgba(255, 255, 255, 0.85);
    transform: scale(1.08);
  }

  /* Position arrows inside slider */
  .swiper-button-prev {
    left: 15px !important;
  }
  .swiper-button-next {
    right: 15px !important;
  }

  /* Remove sudden dark shadows on edges */
  .swiper-slide-shadow-left,
  .swiper-slide-shadow-right {
    background: none !important;
  }

  /* Prevent unwanted overlay from Swiper */
  .swiper-button-next,
  .swiper-button-prev {
    backdrop-filter: blur(6px) !important;
  }

`}
      </style>

    </section>
  );
}
