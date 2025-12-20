export const isImage = (value = "") =>
  /\.(png|jpg|jpeg|webp|gif|svg)$/i.test(value);

export const isVideo = (value = "") =>
  /\.(mp4|mov|webm|avi)$/i.test(value);

export const isMedia = (value = "") =>
  typeof value === "string" && (isImage(value) || isVideo(value));

export const deepAddMediaSEO = (obj, ogImages = []) => {
  if (Array.isArray(obj)) {
    return obj.map((item) => deepAddMediaSEO(item, ogImages));
  }

  if (obj && typeof obj === "object") {
    const newObj = { ...obj };

    for (const key in obj) {
      const value = obj[key];

      // ✅ IMAGE OR VIDEO FOUND
      if (typeof value === "string" && isMedia(value)) {
        // common SEO fields
        newObj[`${key}_alt`] = "";
        newObj[`${key}_width`] = "";
        newObj[`${key}_height`] = "";

        // optional future use
        newObj[`${key}_type`] = isVideo(value) ? "video" : "image";

        // ✅ ONLY IMAGES go to OpenGraph.images
        if (isImage(value) && ogImages.length < 5) {
          ogImages.push({
            url: value,
            width: 1200,
            height: 630,
            alt: ""
          });
        }
      }

      // recurse
      if (typeof value === "object") {
        newObj[key] = deepAddMediaSEO(value, ogImages);
      }
    }

    return newObj;
  }

  return obj;
};
