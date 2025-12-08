import React from "react";
import VideoCard from "./VideoCard";
import homeData from "../../data/homeData.json";

const VideoGallery = () => {
    const { videos, title } = homeData.videoGallery;

    return (
        <section className="py-12">
            <h2 className="text-center text-3xl font-bold mb-8">{title}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {videos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>

            <div className="flex justify-end pr-10 mt-4">
                <button className="text-red-600 font-semibold underline">
                    More Videos →
                </button>
            </div>
        </section>
    );
};

export default VideoGallery;
