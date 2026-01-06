import 'dotenv/config';

console.log("Checking Environment Variables...");

if (process.env.MONGODB_URI) {
    console.log("✅ MONGODB_URI is set");
} else {
    console.log("❌ MONGODB_URI is MISSING");
}

if (process.env.JWT_SECRET) {
    console.log("✅ JWT_SECRET is set");
} else {
    console.log("❌ JWT_SECRET is MISSING");
}

if (process.env.NODE_ENV) {
    console.log(`ℹ️ NODE_ENV is set to: ${process.env.NODE_ENV}`);
} else {
    console.log("ℹ️ NODE_ENV is NOT set (defaulting to development)");
}
