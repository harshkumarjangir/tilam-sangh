import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        embedUrl: {
            type: String,
            required: true
        },
        thumbnail: {
            type: String,
            default: ""
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
videoSchema.index({ category: 1, order: 1 });
videoSchema.index({ status: 1, deletedAt: 1 });

export default mongoose.model("Video", videoSchema);
