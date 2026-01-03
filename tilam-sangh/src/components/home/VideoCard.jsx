import React from "react";

const VideoCard = ({ video, videoTitle }) => {
    return (
        <div className="relative w-full max-w-sm mx-auto rounded-lg overflow-hidden bg-white p-2 shadow-2xl">
            <iframe
                className="w-full h-52"
                src={video?.embedUrl}
                title="video"
                allowFullScreen
            ></iframe>
            {videoTitle && (
                <h3 className="mt-2 text-center text-lg font-medium">{video?.title}</h3>
            )}
        </div>
    );
};

export default VideoCard;
