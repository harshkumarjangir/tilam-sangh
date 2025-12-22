import mongoose from "mongoose";
import { type } from "os";
import seoSchema from "./seo.model.js";

const pageSchema = new mongoose.Schema(
  {
    // 🔑 Page identifier
    slug: {
      type: String,
      unique: true,
      index: true
    },

    // 🌐 Language support
    language: {
      type: String,
      enum: ["English", "Hindi"],
      default: "English"
    },

    // 📦 ACTUAL PAGE CONTENT (HOME / ABOUT / SERVICES etc)
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    seo:{
      type: seoSchema,
      default:()=>{}
    },

    // 🔐 Common CMS fields
    status: {
      type: Boolean,
      default: true
    },
    deletedAt: {
      type: Date,
      default: null
    },
    dateCreated:{
        type:Date,
        default: new Date()
    },
    dateUpdated:{
        type:Date,
        default: null
    }
  },
  { timestamps: true }
);

export default mongoose.model("Page", pageSchema);
