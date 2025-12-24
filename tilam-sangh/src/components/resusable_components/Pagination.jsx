import React from "react";

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxVisiblePages = 5;

  let startPage = Math.max(
    1,
    currentPage - Math.floor(maxVisiblePages / 2)
  );
  let endPage = startPage + maxVisiblePages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const visiblePages = [];
  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }

  return (
    <div className="flex items-center justify-center mt-6 gap-2 flex-wrap">

      {/* Prev */}
      <button
        className={`px-4 py-2 border rounded 
          ${currentPage === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-yellow-600 text-white"
          }`}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>

      {/* Page Numbers */}
      {visiblePages.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`px-3 py-2 border rounded transition
            ${currentPage === num
              ? "bg-blue-600 text-white"
              : "bg-white hover:bg-gray-100"
            }`}
        >
          {num}
        </button>
      ))}

      {/* Next */}
      <button
        className={`px-4 py-2 border rounded 
          ${currentPage === totalPages
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-yellow-600 text-white"
          }`}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}









// import React from "react";

// export default function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   const pageNumbers = [];
//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }



//   return (
//     <div className="flex items-center justify-center mt-6 gap-2 flex-wrap">

//       {/* Prev Button */}
//       <button
//         className={`px-4 py-2 border rounded
//           ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-yellow-600 text-white cursor-pointer"}
//         `}
//         disabled={currentPage === 1}
//         onClick={() => onPageChange(currentPage - 1)}
//       >
//         Prev
//       </button>

//       {/* Page Numbers */}
//       {pageNumbers.map((num) => (
//         <button
//           key={num}
//           onClick={() => onPageChange(num)}
//           className={`px-3 py-2 border rounded transition cursor-pointer
//             ${currentPage === num ? "bg-blue-600 text-white" : "bg-white hover:bg-gray-100"}
//           `}
//         >
//           {num}
//         </button>
//       ))}

//       {/* Next Button */}
//       <button
//         className={`px-4 py-2 border rounded
//           ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-yellow-600 text-white cursor-pointer"}
//         `}
//         disabled={currentPage === totalPages}
//         onClick={() => onPageChange(currentPage + 1)}
//       >
//         Next
//       </button>

//     </div>


//   );
// }



// <div className="flex items-center justify-center mt-6 gap-2 flex-wrap">
//   {/* previous button */}
//   <button
//     className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded disabled:bg-gray-300"
//     onClick={() => onPageChange(currentPage - 1)}
//     disabled={currentPage === 1}
//   >
//     Previous
//   </button>

//   {/* page numbers */}
//   {pageNumbers.map((num) => (
//     <button
//       key={num}
//       onClick={() => onPageChange(num)}
//       className={`px-2 py-1 border rounder ${currentPage === num ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-100"}`}
//     >
//       {num}
//     </button>
//   ))}
// </div>