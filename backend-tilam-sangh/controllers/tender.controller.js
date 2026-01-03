import Tender from "../models/tender.model.js";

// Get all tenders with pagination and filtering
export const getAllTenders = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Build filter
        const filter = { deletedAt: null };
        if (req.query.search) {
            filter.particular = { $regex: req.query.search, $options: 'i' };
        }

        // Get tenders with numeric sort on sno
        const tenders = await Tender.find(filter)
            .sort({ sno: 1 }) // Sort numerically ascending by sno
            .skip(skip)
            .limit(limit);

        const total = await Tender.countDocuments(filter);

        res.json({
            success: true,
            data: tenders,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get tender by ID
export const getTenderById = async (req, res) => {
    try {
        const tender = await Tender.findOne({
            _id: req.params.id,
            deletedAt: null
        }).lean();

        if (!tender) {
            return res.status(404).json({ success: false, message: "Tender not found" });
        }

        res.json({ success: true, data: tender });
    } catch (error) {
        console.error("Get tender by ID error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create new tender
export const createTender = async (req, res) => {
    try {
        const { sno, particular, date, downloadUrl } = req.body;

        if (!sno || !particular || !date || !downloadUrl) {
            return res.status(400).json({
                success: false,
                message: "All fields are required: sno, particular, date, downloadUrl"
            });
        }

        // Check if sno already exists
        const existing = await Tender.findOne({ sno });
        if (existing) {
            return res.status(400).json({
                success: false,
                message: `Tender with sno ${sno} already exists`
            });
        }

        const tender = await Tender.create({
            sno,
            particular,
            date,
            downloadUrl
        });

        res.status(201).json({ success: true, data: tender });
    } catch (error) {
        console.error("Create tender error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update tender
export const updateTender = async (req, res) => {
    try {
        const { sno, particular, date, downloadUrl, status } = req.body;

        const updateData = {};
        if (sno !== undefined) updateData.sno = sno;
        if (particular !== undefined) updateData.particular = particular;
        if (date !== undefined) updateData.date = date;
        if (downloadUrl !== undefined) updateData.downloadUrl = downloadUrl;
        if (status !== undefined) updateData.status = status;

        const tender = await Tender.findOneAndUpdate(
            { _id: req.params.id, deletedAt: null },
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!tender) {
            return res.status(404).json({ success: false, message: "Tender not found" });
        }

        res.json({ success: true, data: tender });
    } catch (error) {
        console.error("Update tender error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete tender (soft delete)
export const deleteTender = async (req, res) => {
    try {
        const tender = await Tender.findOneAndUpdate(
            { _id: req.params.id, deletedAt: null },
            { $set: { deletedAt: new Date() } },
            { new: true }
        );

        if (!tender) {
            return res.status(404).json({ success: false, message: "Tender not found" });
        }

        res.json({ success: true, message: "Tender deleted successfully" });
    } catch (error) {
        console.error("Delete tender error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Bulk upload tenders
export const bulkUploadTenders = async (req, res) => {
    try {
        const { tenders } = req.body;

        if (!Array.isArray(tenders) || tenders.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Tenders array is required"
            });
        }

        const results = {
            created: 0,
            updated: 0,
            errors: []
        };

        for (const tenderData of tenders) {
            try {
                const existing = await Tender.findOne({ sno: tenderData.sno });

                if (existing) {
                    await Tender.findOneAndUpdate(
                        { sno: tenderData.sno },
                        { $set: tenderData },
                        { runValidators: true }
                    );
                    results.updated++;
                } else {
                    await Tender.create(tenderData);
                    results.created++;
                }
            } catch (error) {
                results.errors.push({
                    sno: tenderData.sno,
                    error: error.message
                });
            }
        }

        res.json({
            success: true,
            message: "Bulk upload completed",
            results
        });
    } catch (error) {
        console.error("Bulk upload error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
