import Navbar from "../models/navbar.model.js";

// Get all navbars
export const getAllNavbars = async (req, res) => {
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

        const navbars = await Navbar.find(filter).sort({ createdAt: -1 }).lean();

        res.json({ success: true, data: navbars });
    } catch (error) {
        console.error("Get all navbars error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get navbar by ID
export const getNavbarById = async (req, res) => {
    try {
        const navbar = await Navbar.findOne({
            _id: req.params.id,
            deletedAt: null
        }).lean();

        if (!navbar) {
            return res.status(404).json({ success: false, message: "Navbar not found" });
        }

        res.json({ success: true, data: navbar });
    } catch (error) {
        console.error("Get navbar by ID error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create new navbar
export const createNavbar = async (req, res) => {
    try {
        const { language, items } = req.body;

        if (!language) {
            return res.status(400).json({
                success: false,
                message: "Language is required"
            });
        }

        const navbar = await Navbar.create({
            language,
            items: items || []
        });

        res.status(201).json({ success: true, data: navbar });
    } catch (error) {
        console.error("Create navbar error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update navbar
export const updateNavbar = async (req, res) => {
    try {
        const updateData = { ...req.body };
        delete updateData._id;

        const navbar = await Navbar.findOneAndUpdate(
            { _id: req.params.id, deletedAt: null },
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!navbar) {
            return res.status(404).json({ success: false, message: "Navbar not found" });
        }

        res.json({ success: true, data: navbar });
    } catch (error) {
        console.error("Update navbar error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Patch navbar (partial update)
export const patchNavbar = async (req, res) => {
    try {
        const { path, value } = req.body;

        if (!path) {
            return res.status(400).json({
                success: false,
                message: "Path is required for patch operation"
            });
        }

        const updateObj = { [path]: value };

        const navbar = await Navbar.findOneAndUpdate(
            { _id: req.params.id, deletedAt: null },
            { $set: updateObj },
            { new: true }
        );

        if (!navbar) {
            return res.status(404).json({ success: false, message: "Navbar not found" });
        }

        res.json({ success: true, data: navbar });
    } catch (error) {
        console.error("Patch navbar error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete navbar (soft delete)
export const deleteNavbar = async (req, res) => {
    try {
        const navbar = await Navbar.findOneAndUpdate(
            { _id: req.params.id, deletedAt: null },
            { $set: { deletedAt: new Date() } },
            { new: true }
        );

        if (!navbar) {
            return res.status(404).json({ success: false, message: "Navbar not found" });
        }

        res.json({ success: true, message: "Navbar deleted successfully" });
    } catch (error) {
        console.error("Delete navbar error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
