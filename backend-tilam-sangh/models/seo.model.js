import mongoose from "mongoose";

const ogImageSchema = new mongoose.Schema(
  {
    url: { type: String, default: "" },
    width: { type: Number , default:600 },
    height: { type: Number ,default:400 },
    alt: { type: String, default: "" }
  },
  { _id: false }
);

const openGraphSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    url: { type: String, default: "" },
    type: { type: String, default: "website" },
    images: [ogImageSchema]
  },
  { _id: false }
);

const seoSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    canonical: { type: String, default: "" },

    openGraph: {
      type: openGraphSchema,
      default: () => ({})
    }
  },
  { _id: false }
);

export default seoSchema;
