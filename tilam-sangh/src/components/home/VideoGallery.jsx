import React from "react";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";

const VideoGallery = ({ data }) => {
    const { videos, title } = data
    // console.log("video gallery", data)

    return (
        <section className="py-12 max-w-5xl mx-auto px-4">
            <h2 className="text-center text-3xl font-semibold mb-8">{title}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {videos?.slice(0, 3)?.map((video) => (
                    <VideoCard key={video?.id} video={video} />
                ))}
            </div>

            <div className="flex justify-end pr-10 mt-4">
                <Link to='/videos' className="text-red-600 hover:text-black hover:scale-110 font-semibold underline">
                    More Videos →
                </Link>
            </div>
        </section>
    );
};

export default VideoGallery;
