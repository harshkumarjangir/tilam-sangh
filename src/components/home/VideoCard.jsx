import React from "react";

const VideoCard = ({ video }) => {
    return (
        <div className="relative w-full max-w-sm mx-auto shadow-lg rounded-lg overflow-hidden">
            <iframe
                className="w-full h-56"
                src={video.embedUrl}
                title="video"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default VideoCard;
