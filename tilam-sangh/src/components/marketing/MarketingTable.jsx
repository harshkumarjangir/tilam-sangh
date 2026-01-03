// components/MarketingTable.jsx
import React, { useState } from "react";

function toCSV(rows) {
  const header = ["Year","Soyabean","Mustard","Groundnut","Total"];
  const lines = [header.join(",")];
  rows.forEach(r => {
    lines.push([r.year, r.soyabean, r.mustard, r.groundnut, r.total].join(","));
  });
  return lines.join("\n");
}

export default function MarketingTable({ rows }) {
  const [page, setPage] = useState(1);
  const perPage = 4;
  const pages = Math.ceil(rows.length / perPage);
  const slice = rows.slice((page-1)*perPage, page*perPage);

  const downloadCSV = () => {
    const csv = toCSV(rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tilam_marketing.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-md shadow-sm p-4 border border-yellow-50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-yellow-900">वर्षानुसार मात्रा (मेट्रिक टन)</h3>
        <div className="flex gap-2">
          <button onClick={downloadCSV} className="px-3 py-1 rounded-md border bg-yellow-600 text-white text-sm">
            Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y">
          <thead className="bg-yellow-700 text-white">
            <tr>
              <th className="px-3 py-2 text-left text-sm">वर्ष</th>
              <th className="px-3 py-2 text-right text-sm">सोयाबीन</th>
              <th className="px-3 py-2 text-right text-sm">सरसों</th>
              <th className="px-3 py-2 text-right text-sm">मूंगफली</th>
              <th className="px-3 py-2 text-right text-sm">कुल</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y">
            {slice.map((r) => (
              <tr key={r.year} className="hover:bg-yellow-50">
                <td className="px-3 py-2">{r.year}</td>
                <td className="px-3 py-2 text-right">{r.soyabean}</td>
                <td className="px-3 py-2 text-right">{r.mustard}</td>
                <td className="px-3 py-2 text-right">{r.groundnut}</td>
                <td className="px-3 py-2 text-right font-semibold">{r.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">Page {page} of {pages}</div>
        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => Math.max(1, p-1))}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            disabled={page === pages}
            onClick={() => setPage(p => Math.min(pages, p+1))}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
