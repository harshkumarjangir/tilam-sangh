import React, { useState } from "react";
import ImageSliderModal from "./ImageSliderModal";
import { Link } from "react-router-dom";
import { getAssetUrl } from '../../utils/imageHandler';

const PhotoGallery = ({ data }) => {
    const { heading, photoGallery } = data;
    const photos = photoGallery;
    const [selectedIndex, setSelectedIndex] = useState(null);

    return (
        <div className="max-w-4xl w-full py-10 mx-auto">
            <h2 className="text-center text-3xl font-semibold mb-8">{heading}</h2>

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
                {photos.slice(0, 4).map((item, index) => (
                    <div
                        key={index}
                        className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group w-full sm:w-[48%] md:w-[31%] lg:w-[23%]"
                        onClick={() => setSelectedIndex(index)}
                    >
                        <img
                            src={getAssetUrl(item.image)}
                            alt={item.title}
                            className="w-full h-44 object-cover transform group-hover:scale-105 duration-300"
                        />
                    </div>
                ))}
            </div>
            <div className="flex justify-end pr-10 mt-4">
                <Link to='/gallery' className="text-red-600 hover:text-black hover:scale-110 font-semibold underline">
                    More Photos →
                </Link>
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
