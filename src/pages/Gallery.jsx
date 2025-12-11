import React, { useState } from "react";
import Pagination from "../components/resusable_components/Pagination";
import ImageSliderModal from "../components/home/ImageSliderModal";


const Gallery = ({ data }) => {
    const { heading, photoGallery } = data

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const photos = photoGallery

    const itemsPerPage = 10;

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentPhotos = photos.slice(indexOfFirst, indexOfLast);

    return (
        <div className="max-w-5xl w-full py-10 mx-auto px-4">
            <h2 className="text-center text-3xl font-semibold mb-8">{heading}</h2>
            <div className="flex flex-wrap justify-center gap-4 px-6">
                {currentPhotos?.map((item, index) => (
                    <div
                        key={indexOfFirst + index}
                        className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group w-full sm:w-[48%] md:w-[31%] lg:w-[23%]"
                        onClick={() => setSelectedIndex(indexOfFirst + index)}
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-44 object-cover transform group-hover:scale-105 duration-300"
                        />
                    </div>
                ))}
            </div>
            <Pagination
                totalItems={photos.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
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

export default Gallery;
