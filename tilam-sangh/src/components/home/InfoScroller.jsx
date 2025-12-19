import React from "react";
import ScrollBox from "./Scrollbox";

export default function InfoScroller({ data }) {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 px-6 py-4">
      <ScrollBox 
        title="LATEST UPDATES" 
        iconType="updates"
        data={data.latestUpdates} 
      />

      <ScrollBox 
        title="TENDERS" 
        iconType="tenders"
        data={data.tenders} 
      />

      <ScrollBox 
        title="NEWS" 
        iconType="news"
        data={data.news} 
      />
    </div>
  );
}
