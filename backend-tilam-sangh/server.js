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
import tenderRoutes from "./routes/tender.routes.js";
import galleryRoutes from "./routes/gallery.routes.js";
import userRoutes from "./routes/user.routes.js";
import videoRoutes from "./routes/video.routes.js";
import mediaRoutes from "./routes/media.routes.js";
import siteSettingsRoutes from "./routes/siteSettings.routes.js";




const app = express()
const port = process.env.PORT || 5000
await connectDB()

// Middlewares
app.use(express.json())
app.use(cookieParser())
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
        'https://admin-tilam-sangh.vercel.app/api'] // React App Domain
}))

// API EndPoints
app.get('/', (req, res) => res.send("API Working"))

app.use("/api/uploads", express.static("uploads"));


app.use("/api/auth", authRoutes);
app.use("/api/layout", layoutRoutes);
app.use("/api/pages", pageRoutes);
app.use("/api/multer", multerRoutes);
app.use("/api/footer", footerRoutes);
app.use("/api/navbar", navbarRoutes);
app.use("/api/tenders", tenderRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/settings", siteSettingsRoutes);


// Catch-all route - redirects any unmatched routes to home
// app.use((req, res) => {
//     // res.redirect('/')
//     res.status(404).json({ message: "API endpoint not found" });
// })

app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);

})