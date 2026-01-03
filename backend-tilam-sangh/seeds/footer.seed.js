import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import Footer from "../models/footer.model.js";
import footerData from "../data/footerData.json" assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const MONGO_URL = `${process.env.MONGODB_URI}/tilam-sangh`;

/**
 * 🔑 Footer rule:
 * - DB me EXACT frontend jaisa url
 * - Sirf starting "/" remove (agar ho)
 * - assets/, tenders, pdf sab as-is
 */
const normalizeUrl = (url = "") =>
  url.startsWith("/") ? url.slice(1) : url;

const mapLinks = (links = []) =>
  links.map((l) => ({
    label: l.label,
    url: normalizeUrl(l.url), // 👈 EXACT frontend compatible
    status: true,
    deletedAt: null
  }));

const seedFooter = async () => {
  await Footer.deleteMany({});

  const payload = Object.keys(footerData).map((lang) => {
    const f = footerData[lang];

    return {
      language: lang,

      nodalOfficer: f.NodalOfficer,

      quickLinks: {
        title: f.QuickLinks.title,
        links: mapLinks(f.QuickLinks.links)
      },

      importantLinks: {
        title: f.ImportantLinks.title,
        visitors: f.ImportantLinks.visitors,
        links: mapLinks(f.ImportantLinks.links)
      },

      contact: f.Contact,
      copyright: f.copyright,

      status: true,
      deletedAt: null
    };
  });

  await Footer.insertMany(payload);
  console.log("✅ Footer seeded EXACTLY as frontend expects");
};

const run = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("🟢 MongoDB connected");

    await seedFooter();

    await mongoose.disconnect();
    console.log("🔌 MongoDB disconnected");
    process.exit(0);
  } catch (err) {
    console.error("❌ Footer seed failed:", err.message);
    process.exit(1);
  }
};

run();
