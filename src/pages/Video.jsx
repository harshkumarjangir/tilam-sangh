import React, { useState } from "react";
import VideoCard from "../components/home/VideoCard";
import Pagination from "../components/resusable_components/Pagination";

const Video = ({ data }) => {
    const { videos, title } = data;

      const itemsPerPage = 6; // rows per page
      const [currentPage, setCurrentPage] = useState(1);
    
      // Calculate slice indexes
      const indexOfLast = currentPage * itemsPerPage;
      const indexOfFirst = indexOfLast - itemsPerPage;
    
      // Slice data for current page
      const currentVideos = videos.slice(indexOfFirst, indexOfLast);
      

    return (
        <section className="py-12 max-w-5xl mx-auto px-4">
            <h2 className="text-center text-3xl font-semibold mb-8">{title}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {currentVideos.map((video) => (
                    <VideoCard key={video.id} video={video} videoTitle={true} />
                ))}
            </div>

            <Pagination
                    totalItems={videos.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                  />

            {/* <div className="flex justify-end pr-10 mt-4">
                <button className="text-red-600 font-semibold underline">
                    More Videos →
                </button>
            </div> */}
        </section>
    );
};

export default Video;
