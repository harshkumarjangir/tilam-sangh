import mongoose from "mongoose";

const submenuSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    link: { type: String, default: "" }
  },
  { _id: false }
);

const navbarItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    link: { type: String, default: "" },

    // ✅ FRONTEND MATCH
    submenu: {
      type: [submenuSchema],
      default: undefined
    },

    // ✅ MetablockTech Standard
    status: {
      type: Boolean,
      default: true   // true = active, false = hidden
    },
    deletedAt: {
      type: Date,
      default: null
    }
  },
  { _id: false }
);

const navbarSchema = new mongoose.Schema(
  {
    language: {
      type: String,
      enum: ["English", "Hindi"],
      required: true
    },

    items: [navbarItemSchema],

    // document-level controls
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

export default mongoose.model("Navbar", navbarSchema);
