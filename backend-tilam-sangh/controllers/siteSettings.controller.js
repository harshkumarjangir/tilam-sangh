import SiteSettings from "../models/siteSettings.model.js";

// Get Settings (Public/Private)
export const getSettings = async (req, res) => {
    try {
        const { lang = 'English' } = req.query;
        let settings = await SiteSettings.findOne({ language: lang });

        if (!settings) {
            // Create default if not exists
            settings = await SiteSettings.create({ language: lang });
        }

        res.status(200).json({
            success: true,
            data: settings
        });
    } catch (error) {
        console.error("Error fetching settings:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Update Settings (Admin only)
export const updateSettings = async (req, res) => {
    try {
        const { lang = 'English' } = req.query;
        const updates = req.body;

        // Ensure we don't accidentally create duplicate documents for the same language
        let settings = await SiteSettings.findOneAndUpdate(
            { language: lang },
            { $set: updates },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        res.status(200).json({
            success: true,
            message: "Settings updated successfully",
            data: settings
        });
    } catch (error) {
        console.error("Error updating settings:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
