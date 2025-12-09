import React from "react";
import VideoCard from "./VideoCard";
import homeData from "../../data/homeData.json";

const VideoGallery = () => {
    const { videos, title } = homeData.videoGallery;

    return (
        <section className="py-12 max-w-5xl mx-auto px-4">
            <h2 className="text-center text-3xl font-semibold mb-8">{title}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
