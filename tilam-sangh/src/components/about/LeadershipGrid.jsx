import React from "react";
import { getAssetUrl } from '../../utils/imageHandler';

export default function LeadershipGrid({ members }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {members.map((m, i) => (
        <div key={i} className="border p-4 rounded shadow-sm bg-white">
          <img
            src={getAssetUrl(m.image)}
            alt={m.name}
            className="w-full h-48 object-cover rounded"
          />
          <h4 className="mt-3 text-lg font-bold text-yellow-800">{m.name}</h4>
          <p className="text-gray-600 text-sm">{m.role}</p>
        </div>
      ))}
    </div>
  );
}
