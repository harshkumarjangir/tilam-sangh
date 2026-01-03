import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
    {
        image: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        category: {
            type: String,
            default: "general",
            trim: true
        },
        order: {
            type: Number,
            default: 0
        },
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

// Index for better query performance
gallerySchema.index({ category: 1, order: 1 });
gallerySchema.index({ status: 1, deletedAt: 1 });

export default mongoose.model("Gallery", gallerySchema);
