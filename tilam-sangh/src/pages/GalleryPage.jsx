import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Pagination from "../components/resusable_components/Pagination";
import ImageSliderModal from "../components/home/ImageSliderModal";
import { fetchPageBySlug } from "../redux/slices/pagesSlice";
import { getAssetUrl } from "../utils/imageHandler";

const GalleryPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const slug = location.pathname === "/" ? "" : location.pathname.replace(/^\//, "");

    const pageData = useSelector((s) => s.pages.dataBySlug?.[slug] || null);
    // console.log("pageData", pageData);
    const loading = useSelector((s) => s.pages.loading);

    useEffect(() => {
        dispatch(fetchPageBySlug(slug));
    }, [dispatch, slug]);


    const { heading = 'Photo Gallery', photoGallery = [] } = pageData || {};

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const photos = photoGallery || [];

    const itemsPerPage = 10;

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentPhotos = photos.slice(indexOfFirst, indexOfLast);


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
                            src={getAssetUrl(item.image)}
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

export default GalleryPage;















// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from 'react-redux';
// import Pagination from "../components/resusable_components/Pagination";
// import ImageSliderModal from "../components/home/ImageSliderModal";
// import { fetchPageBySlug } from "../redux/slices/pagesSlice";
// import { Phone } from "lucide-react";

// const GalleryPage = () => {
//     const dispatch = useDispatch();
//     const slug = "gallery";

//     const pageData = useSelector((s) => s.pages.dataBySlug?.[slug] || null);
//     console.log("pageData", pageData);
//     const loading = useSelector((s) => s.pages.loading);
//     const [thisPage, setThisPage] = useState(1);
//     const [selectedIndex, setSelectedIndex] = useState(null);
//     useEffect(() => {
//         dispatch(fetchPageBySlug(slug));
//     }, [dispatch]);

//     if (loading && !pageData) {
//         return (
//             <div className="min-h-[60vh] flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="inline-block w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
//                     <div className="mt-3 text-gray-700">Loading gallery…</div>
//                 </div>
//             </div>
//         );
//     }

//     if (!loading && !pageData) {
//         return (
//             <div className="min-h-[60vh] flex items-center justify-center">
//                 <div className="text-center">
//                     <p className="text-lg font-semibold">No gallery content available.</p>
//                     <div className="mt-4">
//                         <button
//                             onClick={() => dispatch(fetchPageBySlug(slug))}
//                             className="px-4 py-2 bg-[#C64827] text-white rounded"
//                         >Retry</button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     const { heading = 'Photo Gallery', photoGallery = [] } = pageData || {};




//     const itemsPerPage = 10;

//     const indexOfLast = thisPage * itemsPerPage;
//     const indexOfFirst = indexOfLast - itemsPerPage;
//     const currentPhotos = photoGallery.slice(indexOfFirst, indexOfLast);

//     console.log("{}{}{}{}{", currentPhotos, indexOfFirst, indexOfLast);

//     return (
//         <div className="max-w-5xl w-full py-10 mx-auto px-4">
//             <h2 className="text-center text-3xl font-semibold mb-8">{heading}</h2>
//             <div className="flex flex-wrap justify-center gap-4 px-6">
//                 {currentPhotos?.map((item, index) => (
//                     <div
//                         key={indexOfFirst + index}
//                         className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group w-full sm:w-[48%] md:w-[31%] lg:w-[23%]"
//                         onClick={() => setSelectedIndex(indexOfFirst + index)}
//                     >
//                         <img
//                             src={item.image}
//                             alt={item.title}
//                             className="w-full h-44 object-cover transform group-hover:scale-105 duration-300"
//                         />
//                     </div>
//                 ))}
//             </div>
//             <Pagination
//                 totalItems={photoGallery.length}
//                 itemsPerPage={itemsPerPage}
//                 currentPage={thisPage}
//                 onPageChange={setThisPage}
//             />
//             {selectedIndex !== null && (
//                 <ImageSliderModal
//                     photos={photoGallery}
//                     selectedIndex={selectedIndex}
//                     onClose={() => setSelectedIndex(null)}
//                 />
//             )}
//         </div>
//     );
// };

// export default GalleryPage;
