import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import connectDB from './config/connectDB.js'
import layoutRoutes from "./routes/layout.routes.js";
import pageRoutes from "./routes/page.routes.js";
import multerRoutes from "./routes/multer.routes.js";
import authRoutes from "./routes/auth.routes.js";
import footerRoutes from "./routes/footer.routes.js";
import navbarRoutes from "./routes/navbar.routes.js";
import userRoutes from "./routes/user.routes.js";
import mediaRoutes from "./routes/media.routes.js";
import siteSettingsRoutes from "./routes/siteSettings.routes.js";
import adminRoutes from "./routes/admin.routes.js";


import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';

// ... other imports

const app = express()
const port = process.env.PORT || 5000
await connectDB()

// Trust Proxy for Vercel/Heroku (Required for Secure Coookies)
app.set('trust proxy', 1);

// CORS - Must be first
app.use(cors({
    credentials: true, // To send Cookies in Response fron Express App
    origin: [
        'http://localhost:3000',
        'http://192.168.1.18:3000',
        'http://localhost:5173',
        'http://localhost:5174', 'http://localhost:5175',
        'https://tilam-sangh.vercel.app',
        'https://tilam-sangh.vercel.app/api',
        'https://admin-tilam-sangh.vercel.app',
        'https://admin-tilam-sangh.vercel.app/api']
}))

// Security Middlewares
app.use(helmet({
    crossOriginResourcePolicy: false, // Allow loading images from different origins/same origin effectively
}));

// Rate Limit
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

// Body Parsers & Cookie Parser
app.use(express.json());
app.use(cookieParser());

// Data Sanitization
// app.use(mongoSanitize()); // Prevent NoSQL injection
// app.use(xss()); // Prevent XSS

// Prevent Parameter Pollution
// app.use(hpp());


// API EndPoints
app.get('/', (req, res) => res.send("API Working"))

app.use("/api/uploads", express.static("uploads"));


app.use("/api/auth", authRoutes);
app.use("/api/layout", layoutRoutes);
app.use("/api/pages", pageRoutes);
app.use("/api/multer", multerRoutes);
app.use("/api/footer", footerRoutes);
app.use("/api/navbar", navbarRoutes);
app.use("/api/users", userRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/settings", siteSettingsRoutes);
app.use("/api/admin", adminRoutes);


// Catch-all route - redirects any unmatched routes to home
// app.use((req, res) => {
//     // res.redirect('/')
//     res.status(404).json({ message: "API endpoint not found" });
// })

app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);

})