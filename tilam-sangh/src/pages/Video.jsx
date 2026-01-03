import React, { useEffect, useState } from "react";
import VideoCard from "../components/home/VideoCard";
import Pagination from "../components/resusable_components/Pagination";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPageBySlug } from "../redux/slices/pagesSlice";

const Video = () => {
    // const { videos, title } = data;

    const dispatch = useDispatch();
    const location = useLocation();
    const slug = location.pathname === "/" ? "" : location.pathname.replace(/^\//, "");

    const pageData = useSelector((s) => s.pages.dataBySlug?.[slug] || null);
    const loading = useSelector((s) => s.pages.loading);

    useEffect(() => {
        dispatch(fetchPageBySlug(slug));
    }, [dispatch, slug]);

    // console.log("videes page data", pageData);  

    const videos = pageData?.videoGallery?.videos || [];
    const title = pageData?.videoGallery?.title || "Videos";

    const itemsPerPage = 6; // rows per page
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate slice indexes
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;

    // Slice data for current page
    const currentVideos = videos.slice(indexOfFirst, indexOfLast);

    if (loading && !pageData) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
                    <div className="mt-3 text-gray-700">Loading gallery…</div>
                </div>
            </div>
        );
    }

    if (!loading && !pageData) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <p className="text-lg font-semibold">No gallery content available.</p>
                    <div className="mt-4">
                        <button
                            onClick={() => dispatch(fetchPageBySlug(slug))}
                            className="px-4 py-2 bg-[#C64827] text-white rounded"
                        >Retry</button>
                    </div>
                </div>
            </div>
        );
    }


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
