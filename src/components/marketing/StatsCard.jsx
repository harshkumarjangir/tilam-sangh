// components/StatsCard.jsx
import React from "react";

export default function StatsCard({ title, value, hint }) {
  return (
    <div className="bg-white rounded-md shadow p-4 border">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="mt-1 text-2xl font-bold text-yellow-800">{value}</div>
      {hint && <div className="text-xs text-gray-500 mt-1">{hint}</div>}
    </div>
  );
}
