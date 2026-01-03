import Footer from "../models/footer.model.js";

// Get all footers
export const getAllFooters = async (req, res) => {
    try {
        const filter = { deletedAt: null };

        // Optional language filter
        if (req.query.language) {
            filter.language = req.query.language;
        }

        // Optional status filter
        if (req.query.status !== undefined) {
            filter.status = req.query.status === 'true';
        }

        const footers = await Footer.find(filter).sort({ createdAt: -1 }).lean();

        res.json({ success: true, data: footers });
    } catch (error) {
        console.error("Get all footers error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get footer by ID
export const getFooterById = async (req, res) => {
    try {
        const footer = await Footer.findOne({
            _id: req.params.id,
            deletedAt: null
        }).lean();

        if (!footer) {
            return res.status(404).json({ success: false, message: "Footer not found" });
        }

        res.json({ success: true, data: footer });
    } catch (error) {
        console.error("Get footer by ID error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create new footer
export const createFooter = async (req, res) => {
    try {
        const { language, nodalOfficer, quickLinks, importantLinks, contact, copyright } = req.body;

        if (!language) {
            return res.status(400).json({
                success: false,
                message: "Language is required"
            });
        }

        const footer = await Footer.create({
            language,
            nodalOfficer,
            quickLinks,
            importantLinks,
            contact,
            copyright
        });

        res.status(201).json({ success: true, data: footer });
    } catch (error) {
        console.error("Create footer error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update footer
export const updateFooter = async (req, res) => {
    try {
        const updateData = { ...req.body };
        delete updateData._id;

        const footer = await Footer.findOneAndUpdate(
            { _id: req.params.id, deletedAt: null },
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!footer) {
            return res.status(404).json({ success: false, message: "Footer not found" });
        }

        res.json({ success: true, data: footer });
    } catch (error) {
        console.error("Update footer error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Patch footer (partial update)
export const patchFooter = async (req, res) => {
    try {
        const { path, value } = req.body;

        if (!path) {
            return res.status(400).json({
                success: false,
                message: "Path is required for patch operation"
            });
        }

        const updateObj = { [path]: value };

        const footer = await Footer.findOneAndUpdate(
            { _id: req.params.id, deletedAt: null },
            { $set: updateObj },
            { new: true }
        );

        if (!footer) {
            return res.status(404).json({ success: false, message: "Footer not found" });
        }

        res.json({ success: true, data: footer });
    } catch (error) {
        console.error("Patch footer error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete footer (soft delete)
export const deleteFooter = async (req, res) => {
    try {
        const footer = await Footer.findOneAndUpdate(
            { _id: req.params.id, deletedAt: null },
            { $set: { deletedAt: new Date() } },
            { new: true }
        );

        if (!footer) {
            return res.status(404).json({ success: false, message: "Footer not found" });
        }

        res.json({ success: true, message: "Footer deleted successfully" });
    } catch (error) {
        console.error("Delete footer error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
