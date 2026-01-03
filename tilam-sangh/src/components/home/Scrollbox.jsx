import React, { useRef, useState, useEffect } from "react";
import { getAssetUrl } from '../../utils/imageHandler';
import { Pause, Play, Newspaper } from "lucide-react";
import { FaRegHandPointRight } from "react-icons/fa";

export default function ScrollBox({ title, iconType, data }) {
  const boxRef = useRef(null);
  const innerRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [displayData, setDisplayData] = useState([]);

  // STEP 1 → Build repeated list based on container height
  useEffect(() => {
    if (!boxRef.current) {
      setDisplayData([...data, ...data]);
      return;
    }

    let repeated = [...data];
    const containerHeight = 350; // fixed height
    let estimatedHeight = data.length * 60; // avg item height

    // keep repeating until content >= 3X container height
    while (estimatedHeight < containerHeight * 3) {
      repeated = [...repeated, ...data];
      estimatedHeight += data.length * 60;
    }

    setDisplayData(repeated);
  }, [data]);

  // STEP 2 → Infinite scroll logic
  useEffect(() => {
    if (displayData.length === 0) return;

    let speed = 0.4;
    let frame;

    /**
     * Smoothly auto-scrolls a container element using requestAnimationFrame.
     *
     * Description (English):
     *  - If scrolling is not paused and both boxRef and innerRef are available, this function
     *    advances the vertical scroll position (box.scrollTop) by the configured `speed`.
     *  - When the scroll reaches or exceeds the reset point (inner.scrollHeight - box.clientHeight),
     *    it wraps back to the top (box.scrollTop = 0) to create a seamless loop.
     *  - Schedules the next frame via requestAnimationFrame and assigns the handle to `frame`.
     *
     * विवरण (हिन्दी):
     *  - यदि स्क्रॉलिंग paused नहीं है और boxRef तथा innerRef सेट हैं, यह फ़ंक्शन `speed` के अनुसार
     *    ऊर्ध्वाधर स्क्रॉल स्थिति (box.scrollTop) को बढ़ाता है।
     *  - जब स्क्रॉल reset पॉइंट (inner.scrollHeight - box.clientHeight) तक पहुँच जाये, यह फिर से टॉप पर
     *    लौट आता है (box.scrollTop = 0) ताकि लूप बन सके।
     *  - अगले फ्रेम के लिए requestAnimationFrame को कॉल करता है और हैंडल `frame` में स्टोर करता है।
     *
     * Important / महत्वपूर्ण:
     *  - Ensure `boxRef.current` and `innerRef.current` reference valid DOM elements before calling.
     *    कृपया सुनिश्चित करें कि `boxRef.current` और `innerRef.current` सही DOM एलिमेंट्स को संदर्भित कर रहे हैं।
     *  - `speed` should be a finite number (typically positive); unexpected values may produce irregular scrolling.
     *    `speed` एक सीमित संख्या होनी चाहिए (आम तौर पर धनात्मक); अनियमित मान अजीब स्क्रॉलिंग कर सकते हैं।
     *  - This function mutates DOM state (box.scrollTop) and relies on an external `frame` variable.
     *    यह फ़ंक्शन DOM स्थिति (box.scrollTop) को परिवर्तित करता है और बाहरी `frame` वेरिएबल पर निर्भर है।
     *  - To stop the loop, call cancelAnimationFrame(frame) and/or set `paused = true`.
     *    लूप रोकने के लिए cancelAnimationFrame(frame) कॉल करें और/या `paused = true` सेट करें।
     *
     * @function scroll
     * @returns {void} Does not return a value; schedules subsequent animation frames.
     */
    const scroll = () => {
      if (!paused && boxRef.current && innerRef.current) {
        const box = boxRef.current;
        const inner = innerRef.current;

        const resetPoint = inner.scrollHeight - box.clientHeight;

        box.scrollTop += speed;

        if (box.scrollTop >= resetPoint) {
          box.scrollTop = 0;
        }
      }

      frame = requestAnimationFrame(scroll);
    };

    frame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(frame);
  }, [paused, displayData]);







  // ICON HANDLER
  const renderIcon = (item) => {
    if (iconType === "updates") {
      return <span className="text-red-600 text-[20px]"><FaRegHandPointRight /></span>;
    }
    if (iconType === "tenders") {
      return (
        <div className="bg-red-600 text-white text-[12px] px-2 py-1 rounded font-bold min-w-20 min-h-7 text-center">
          {item.date}
        </div>
      );
    }
    if (iconType === "news") {
      return <span className="text-red-600 text-[20px]"><Newspaper /></span>;
    }
    return null;
  };




  return (
    <div className="bg-white shadow-xl rounded-lg border border-red-600 overflow-hidden">

      {/* HEADER */}
      <div className="flex justify-between items-center px-4 py-3 bg-red-600 text-white">
        <h2 className="font-bold flex items-center gap-2 text-[18px]">{title}</h2>

        <button
          onClick={() => setPaused(!paused)}
          className="p-1 hover:bg-white/20 transition rounded"
        >
          {paused ? <Play size={20} /> : <Pause size={20} />}
        </button>
      </div>

      {/* CONTENT AREA */}
      <div
        ref={boxRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="h-[350px] overflow-y-scroll no-scrollbar px-4 py-2"
      >
        <div ref={innerRef}>
          {displayData.map((item, i) => (
            <div
              key={i}
              className="border-b border-gray-300 pb-2 flex gap-3 items-start text-[15px] leading-relaxed hover:bg-gray-50 p-2 transition"
            >
              {renderIcon(item)}

              <a
                href={getAssetUrl(item.link)}
                target="_blank"
                className="hover:underline font-medium"
              >
                {item.text}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="px-4 py-2 text-right text-red-600 font-semibold cursor-pointer hover:underline">
        View All »
      </div>
    </div>
  );
}
