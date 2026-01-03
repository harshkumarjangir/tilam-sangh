import Video from "../models/video.model.js";

// Get all videos with pagination and filtering
export const getAllVideos = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const filter = { deletedAt: null };

        if (req.query.category) {
            filter.category = req.query.category;
        }

        if (req.query.status !== undefined) {
            filter.status = req.query.status === 'true';
        }

        const videos = await Video.find(filter)
            .sort({ order: 1, createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await Video.countDocuments(filter);

        res.json({
            success: true,
            data: videos,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error("Get all videos error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getVideoById = async (req, res) => {
    try {
        const video = await Video.findOne({
            _id: req.params.id,
            deletedAt: null
        }).lean();

        if (!video) {
            return res.status(404).json({ success: false, message: "Video not found" });
        }

        res.json({ success: true, data: video });
    } catch (error) {
        console.error("Get video by ID error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createVideo = async (req, res) => {
    try {
        const { title, embedUrl, thumbnail, category, order } = req.body;

        if (!title || !embedUrl) {
            return res.status(400).json({
                success: false,
                message: "Title and embedUrl are required"
            });
        }

        const video = await Video.create({
            title,
            embedUrl,
            thumbnail: thumbnail || "",
            category: category || "general",
            order: order || 0
        });

        res.status(201).json({ success: true, data: video });
    } catch (error) {
        console.error("Create video error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateVideo = async (req, res) => {
    try {
        const { title, embedUrl, thumbnail, category, order, status } = req.body;

        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (embedUrl !== undefined) updateData.embedUrl = embedUrl;
        if (thumbnail !== undefined) updateData.thumbnail = thumbnail;
        if (category !== undefined) updateData.category = category;
        if (order !== undefined) updateData.order = order;
        if (status !== undefined) updateData.status = status;

        const video = await Video.findOneAndUpdate(
            { _id: req.params.id, deletedAt: null },
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!video) {
            return res.status(404).json({ success: false, message: "Video not found" });
        }

        res.json({ success: true, data: video });
    } catch (error) {
        console.error("Update video error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteVideo = async (req, res) => {
    try {
        const video = await Video.findOneAndUpdate(
            { _id: req.params.id, deletedAt: null },
            { $set: { deletedAt: new Date() } },
            { new: true }
        );

        if (!video) {
            return res.status(404).json({ success: false, message: "Video not found" });
        }

        res.json({ success: true, message: "Video deleted successfully" });
    } catch (error) {
        console.error("Delete video error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const bulkUploadVideos = async (req, res) => {
    try {
        const { videos } = req.body;

        if (!Array.isArray(videos) || videos.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Videos array is required"
            });
        }

        const createdVideos = await Video.insertMany(videos, { ordered: false });

        res.json({
            success: true,
            message: "Bulk upload completed",
            data: createdVideos
        });
    } catch (error) {
        console.error("Bulk upload error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
