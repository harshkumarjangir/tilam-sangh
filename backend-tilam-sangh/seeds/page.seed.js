import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import Page from "../models/page.model.js";
import homeData from "../data/homeData.json" assert { type: "json" };

// 🔑 MEDIA SEO UTILS (IMPORTED)
import { deepAddMediaSEO } from "./mediaSEO.seed.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.resolve(__dirname, "../.env"),
});

const MONGO_URL = `${process.env.MONGODB_URI}/tilam-sangh`;

const seedPages = async () => {
    try {
        // 🔥 Remove existing homepage
        await Page.deleteMany({ slug: "", language: "English" });

        // 🔎 Collect OG images here
        const ogImages = [];

        // ✅ Add media SEO fields inside data
        const enrichedData = deepAddMediaSEO(homeData, ogImages);

        // 🔒 Guarantee: OpenGraph images never empty
        // const finalOgImages =
        //   ogImages.length > 0
        //     ? ogImages
        //     : [
        //         {
        //           url: "",
        //           width: "",
        //           height: "",
        //           alt: ""
        //         }
        //       ];

        const finalOgImages = [
            {
                url: "",
                width: "",
                height: "",
                alt: ""
            }
        ];

        // ✅ Create homepage document
        await Page.create({
            slug: "", // homepage
            language: "English",

            data: enrichedData,

            seo: {
                title: "",
                description: "",
                canonical: "",
                openGraph: {
                    title: "",
                    description: "",
                    url: "",
                    type: "website",
                    images: finalOgImages
                }
            },

            status: true,
            deletedAt: null,
            dateCreated: new Date(),
            dateUpdated: null
        });

        console.log("✅ Page seeded with media SEO + OpenGraph images");
    } catch (error) {
        console.error("❌ Page seed failed:", error);
    }
};

const run = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("🟢 MongoDB connected");

        await seedPages();

        await mongoose.disconnect();
        console.log("🔌 MongoDB disconnected");
        process.exit(0);
    } catch (err) {
        console.error("❌ Seed process error:", err.message);
        process.exit(1);
    }
};

run();
