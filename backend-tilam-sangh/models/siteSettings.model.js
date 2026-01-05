import mongoose from "mongoose";

const siteSettingsSchema = new mongoose.Schema({
    language: {
        type: String,
        default: 'English'
    },
    title: {
        type: String,
        default: 'Tilam Sangh'
    },
    description: {
        type: String,
        default: ''
    },
    keywords: {
        type: String,
        default: ''
    },
    logo: {
        type: String,
        default: ''
    },
    favicon: {
        type: String,
        default: ''
    },
    contact: {
        phone: { type: String, default: '' },
        email: { type: String, default: '' },
        address: { type: String, default: '' },
        mapUrl: { type: String, default: '' } // For Google Maps embed
    },
    socialLinks: [{
        platform: String,
        url: String,
        icon: String
    }]
}, { timestamps: true });

const SiteSettings = mongoose.model("SiteSettings", siteSettingsSchema);

export default SiteSettings;
