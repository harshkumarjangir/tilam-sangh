import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { getAssetUrl } from '../../utils/imageHandler';

const ImageSliderModal = ({ photos, selectedIndex, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(selectedIndex);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % photos.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            {/* Close Button */}
            <button
                className="absolute top-6 right-6 text-white text-4xl"
                onClick={onClose}
            >
                <X size={40} />
            </button>

            {/* Left arrow */}
            <button
                className="absolute left-6 text-white"
                onClick={prevSlide}
            >
                <ChevronLeft size={40} />
            </button>

            {/* Image + Title */}
            <div className="text-center">
                <img
                    src={getAssetUrl(photos[currentIndex].image)}
                    alt=""
                    className="max-h-[70vh] max-w-[90vw] rounded-lg shadow-lg mx-auto"
                />
                <h3 className="text-white text-2xl font-bold mt-5">
                    {photos[currentIndex].title}
                </h3>
            </div>

            {/* Right arrow */}
            <button
                className="absolute right-6 text-white"
                onClick={nextSlide}
            >
                <ChevronRight size={40} />
            </button>
        </div>
    );
};

export default ImageSliderModal;
