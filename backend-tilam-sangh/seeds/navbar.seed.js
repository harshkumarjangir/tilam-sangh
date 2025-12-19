import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import Navbar from "../models/navbar.model.js";
import navbarData from "../data/navbarData.json" assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const MONGO_URL = `${process.env.MONGODB_URI}/tilam-sangh`;

const seedNavbar = async () => {
  await Navbar.deleteMany({});

  const payload = Object.keys(navbarData).map((lang) => ({
    language: lang,
    status: true,
    deletedAt: null,

    items: navbarData[lang].map((item) => ({
      title: item.title,
      link: item.link || "",
      submenu: item.submenu || undefined,
      status: true,
      deletedAt: null
    }))
  }));

  await Navbar.insertMany(payload);
  console.log("✅ Navbar seeded with boolean status");
};

const run = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("🟢 MongoDB connected");

    await seedNavbar();

    await mongoose.disconnect();
    console.log("🔌 MongoDB disconnected");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    process.exit(1);
  }
};

run();
