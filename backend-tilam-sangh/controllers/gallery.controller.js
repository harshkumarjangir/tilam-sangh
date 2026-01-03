import Gallery from "../models/gallery.model.js";

// Get all photos with pagination and filtering
export const getAllPhotos = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const filter = { deletedAt: null };

        // Optional category filter
        if (req.query.category) {
            filter.category = req.query.category;
        }

        // Optional status filter
        if (req.query.status !== undefined) {
            filter.status = req.query.status === 'true';
        }

        const photos = await Gallery.find(filter)
            .sort({ order: 1, createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await Gallery.countDocuments(filter);

        res.json({
            success: true,
            data: photos,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error("Get all photos error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get photo by ID
export const getPhotoById = async (req, res) => {
    try {
        const photo = await Gallery.findOne({
            _id: req.params.id,
            deletedAt: null
        }).lean();

        if (!photo) {
            return res.status(404).json({ success: false, message: "Photo not found" });
        }

        res.json({ success: true, data: photo });
    } catch (error) {
        console.error("Get photo by ID error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create new photo
export const createPhoto = async (req, res) => {
    try {
        const { image, title, category, order } = req.body;

        if (!image || !title) {
            return res.status(400).json({
                success: false,
                message: "Image and title are required"
            });
        }

        const photo = await Gallery.create({
            image,
            title,
            category: category || "general",
            order: order || 0
        });

        res.status(201).json({ success: true, data: photo });
    } catch (error) {
        console.error("Create photo error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update photo
export const updatePhoto = async (req, res) => {
    try {
        const { image, title, category, order, status } = req.body;

        const updateData = {};
        if (image !== undefined) updateData.image = image;
        if (title !== undefined) updateData.title = title;
        if (category !== undefined) updateData.category = category;
        if (order !== undefined) updateData.order = order;
        if (status !== undefined) updateData.status = status;

        const photo = await Gallery.findOneAndUpdate(
            { _id: req.params.id, deletedAt: null },
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!photo) {
            return res.status(404).json({ success: false, message: "Photo not found" });
        }

        res.json({ success: true, data: photo });
    } catch (error) {
        console.error("Update photo error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete photo (soft delete)
export const deletePhoto = async (req, res) => {
    try {
        const photo = await Gallery.findOneAndUpdate(
            { _id: req.params.id, deletedAt: null },
            { $set: { deletedAt: new Date() } },
            { new: true }
        );

        if (!photo) {
            return res.status(404).json({ success: false, message: "Photo not found" });
        }

        res.json({ success: true, message: "Photo deleted successfully" });
    } catch (error) {
        console.error("Delete photo error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Bulk upload photos
export const bulkUploadPhotos = async (req, res) => {
    try {
        const { photos } = req.body;

        if (!Array.isArray(photos) || photos.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Photos array is required"
            });
        }

        const createdPhotos = await Gallery.insertMany(photos, { ordered: false });

        res.json({
            success: true,
            message: "Bulk upload completed",
            data: createdPhotos
        });
    } catch (error) {
        console.error("Bulk upload error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
