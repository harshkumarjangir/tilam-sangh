import mongoose from "mongoose";

/* ---------- Common Link Schema ---------- */
const linkSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    url: { type: String, default: "" }, // stored WITHOUT leading /
    status: { type: Boolean, default: true },
    deletedAt: { type: Date, default: null }
  },
  { _id: false }
);

/* ---------- Main Footer Schema ---------- */
const footerSchema = new mongoose.Schema(
  {
    language: {
      type: String,
      enum: ["English", "Hindi"],
      required: true
    },

    nodalOfficer: {
      title: String,
      name: String,
      contact: String,
      designation: String,
      mission: String,
      address: [String]
    },

    quickLinks: {
      title: String,
      links: [linkSchema]
    },

    importantLinks: {
      title: String,
      links: [linkSchema],
      visitors: String
    },

    contact: {
      title: String,
      phone: String,
      email: String
    },

    copyright: {
      type: String
    },

    // 🔐 MetablockTech standard
    status: {
      type: Boolean,
      default: true
    },
    deletedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

export default mongoose.model("Footer", footerSchema);
