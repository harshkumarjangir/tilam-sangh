import React, { useState } from "react";
import ImageSliderModal from "./ImageSliderModal";
import homeData from "../../data/homeData.json";

const PhotoGallery = () => {
    const photos = homeData.photoGallery;
    const [selectedIndex, setSelectedIndex] = useState(null);

    return (
        <div className="max-w-4xl w-full py-10 mx-auto">
            <h2 className="text-center text-3xl font-semibold mb-8">PHOTO GALLERY</h2>

            {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-6">
                {photos.map((item, index) => (
                    <div
                        key={index}
                        className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group"
                        onClick={() => setSelectedIndex(index)}
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-44 object-cover transform group-hover:scale-105 duration-300"
                        />

                        Hover title
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300">
                            <p className="text-white font-semibold text-center px-2">
                                {item.title}
                            </p>
                        </div>
                    </div>
                ))}
            </div> */}

            <div className="flex flex-wrap justify-center gap-4 px-6">
                {photos.map((item, index) => (
                    <div
                        key={index}
                        className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group w-full sm:w-[48%] md:w-[31%] lg:w-[23%]"
                        onClick={() => setSelectedIndex(index)}
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-44 object-cover transform group-hover:scale-105 duration-300"
                        />
                    </div>
                ))}
            </div>


            {/* Image Slider Modal */}
            {selectedIndex !== null && (
                <ImageSliderModal
                    photos={photos}
                    selectedIndex={selectedIndex}
                    onClose={() => setSelectedIndex(null)}
                />
            )}
        </div>
    );
};

export default PhotoGallery;
