import mongoose from "mongoose";

const tenderSchema = new mongoose.Schema(
    {
        sno: {
            type: Number,
            required: true,
            unique: true
        },
        particular: {
            type: String,
            required: true,
            trim: true
        },
        date: {
            type: Date,
            required: true
        },
        downloadUrl: {
            type: String,
            required: true
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
tenderSchema.index({ sno: 1 });
tenderSchema.index({ date: -1 });
tenderSchema.index({ status: 1, deletedAt: 1 });

export default mongoose.model("Tender", tenderSchema);
