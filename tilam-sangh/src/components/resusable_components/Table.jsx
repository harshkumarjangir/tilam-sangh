
import React, { useState } from "react";
import Pagination from "./Pagination";

export default function Table({ data }) {
  const { tenders, heading } = data;

  const itemsPerPage = 10; // rows per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate slice indexes
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  // Slice data for current page
  const currentTenders = tenders.slice(indexOfFirst, indexOfLast);
  // console.log("currentTenders", currentTenders);
  

  return (
    <section className="w-full bg-white py-10">
      <h2 className="text-center text-3xl font-bold text-red-700 mb-6 tracking-wide">
        {heading}
        
      </h2>

      <div className="overflow-x-auto mx-4 md:mx-10">
        <table className="w-full border border-gray-400">
          {/* Header */}
          <thead className="bg-yellow-600 text-white">
            <tr className="text-left text-lg">
              <th className="border border-gray-300 px-4 py-2 w-16 text-center">S.No</th>
              <th className="border border-gray-300 px-4 py-2">Particulars</th>
              <th className="border border-gray-300 px-4 py-2 w-40 text-center">Date</th>
              <th className="border border-gray-300 px-4 py-2 w-40 text-center">Downloads</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {currentTenders.map(({ sno, particular, date, downloadUrl }) => (
              <tr key={sno} className="text-base hover:bg-yellow-100 transition">
                <td className="border px-4 py-2 text-center">{sno}</td>
                <td className="border px-4 py-2">{particular}</td>
                <td className="border px-4 py-2 text-center">
                  {new Date(date).toLocaleDateString("en-IN")}
                </td>
                <td className="border px-4 py-2 text-center">
                  <a
                    href={downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 font-semibold underline hover:text-blue-900"
                  >
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Component */}
      <Pagination
        totalItems={tenders.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}








// import React from "react";

// export default function Table({ data }) {
//     const {tenders, heading} = data;
//   return (
//     <section className="w-full bg-white py-10">
//       <h2 className="text-center text-3xl font-bold text-red-700 mb-6 tracking-wide">
//         {heading}
//       </h2>

//       <div className="overflow-x-auto mx-4 md:mx-10">
//         <table className="w-full border border-gray-400">
//           {/* Header */}
//           <thead className="bg-yellow-600 text-white">
//             <tr className="text-left text-lg">
//               <th className="border border-gray-300 px-4 py-2 w-16 text-center">
//                 S.No
//               </th>
//               <th className="border border-gray-300 px-4 py-2">
//                 Particulars
//               </th>
//               <th className="border border-gray-300 px-4 py-2 w-40 text-center">
//                 Date
//               </th>
//               <th className="border border-gray-300 px-4 py-2 w-40 text-center">
//                 Downloads
//               </th>
//             </tr>
//           </thead>

//           {/* Body */}
//           <tbody>
//             {tenders.map(({ sno, particular, date, downloadUrl }) => (
//               <tr
//                 key={sno}
//                 className="text-base hover:bg-yellow-100 transition"
//               >
//                 <td className="border px-4 py-2 text-center">{sno}</td>

//                 <td className="border px-4 py-2">{particular}</td>

//                 <td className="border px-4 py-2 text-center">
//                   {new Date(date).toLocaleDateString("en-IN")}
//                 </td>

//                 <td className="border px-4 py-2 text-center">
//                   <a
//                     href={downloadUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-700 font-semibold underline hover:text-blue-900"
//                   >
//                     Download 
//                   </a>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </section>
//   );
// }
