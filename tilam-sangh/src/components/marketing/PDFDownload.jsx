// components/PDFDownload.jsx
import React from "react";
import { getAssetUrl } from '../../utils/imageHandler';

export default function PDFDownload({ pdf }) {
  // pdf: { id, title, description, file }
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-yellow-100">
      <h3 className="text-lg font-semibold text-yellow-900">{pdf.title}</h3>
      <p className="text-sm text-gray-600 mt-1">{pdf.description}</p>

      <div className="mt-3 flex gap-3">
        <a
          href={getAssetUrl(pdf.file)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 rounded-md border border-yellow-700 bg-yellow-600 text-white text-sm font-medium hover:bg-yellow-700"
        >
          Open PDF
        </a>

        <a
          href={getAssetUrl(pdf.file)}
          download
          className="inline-block px-4 py-2 rounded-md border border-gray-300 text-sm hover:bg-gray-50"
        >
          Download
        </a>
      </div>
    </div>
  );
}
