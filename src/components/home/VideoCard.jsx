import React from "react";

const VideoCard = ({ video }) => {
    return (
        <div className="relative w-full max-w-sm mx-auto rounded-lg overflow-hidden bg-white p-2 shadow-2xl">
            <iframe
                className="w-full h-52"
                src={video.embedUrl}
                title="video"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default VideoCard;
