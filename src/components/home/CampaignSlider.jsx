import React from "react";
import homeData from "@/data/homeData.json";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function CooperativeCampaignSlider() {
  const { slides, sidebar, footer } = homeData;

  return (
    <section className="w-full bg-[#fbd067] pb-2">
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
                  src={slide.image}
                  className="w-full h-[450px] object-cover"
                  alt={`slide-${index}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* RIGHT STATIC SIDEBAR */}
        <div className="flex flex-col gap-4">

          {/* TOP CARD */}
          <div className="bg-[#3b3b3b] rounded-xl overflow-hidden p-3 flex flex-col items-center">
            <img
              src={sidebar.topImage}
              className="w-36 rounded-xl"
              alt="CM"
            />
          </div>

          {/* BOTTOM CARD */}
          <div className="bg-[#3b3b3b] rounded-xl overflow-hidden p-3 flex flex-col items-center">
            <img
              src={sidebar.bottomImage}
              className="w-36 rounded-xl"
              alt="Minister"
            />
          </div>

        </div>
      </div>

      {/* FOOTER BAR WITH INFINITE MARQUEE */}
      <div className="bg-[#fbd067] flex items-center justify-between px-6 py-3 border-t border-black/20">
        <span className="text-[#2b2b2b] text-xl font-semibold">
          {footer.left}
        </span>

        {/* Marquee animation */}
        <div className="overflow-hidden w-[300px]">
          <div className="whitespace-nowrap animate-marquee text-[#2b2b2b] text-lg font-semibold">
            {footer.right} — {footer.right} — {footer.right}
          </div>
        </div>
      </div>

      {/* MARQUEE KEYFRAMES */}
      <style>
        {`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 12s linear infinite;
        }
        `}
      </style>
    </section>
  );
}
