import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

const createAdminUser = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(`${process.env.MONGODB_URI}/tilam-sangh`);
        console.log("✅ Database Connected");

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: "admin@tilamsangh.com" });

        if (existingAdmin) {
            console.log("⚠️  Admin user already exists!");
            console.log("Email: admin@tilamsangh.com");
            console.log("If you forgot the password, delete the user from database and run this script again.");
            process.exit(0);
        }

        // Create admin user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("admin123", salt);

        const admin = await User.create({
            name: "Admin",
            email: "admin@tilamsangh.com",
            password: hashedPassword,
            role: "admin"
        });

        console.log("✅ Admin user created successfully!");
        console.log("\n📧 Login Credentials:");
        console.log("Email: admin@tilamsangh.com");
        console.log("Password: admin123");
        console.log("\n⚠️  IMPORTANT: Change this password after first login!");

        process.exit(0);
    } catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
};

createAdminUser();
