import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import connectDB from './config/connectDB.js'
import layoutRoutes from "./routes/layout.routes.js";
import pageRoutes from "./routes/page.routes.js";








const app = express()
const port = process.env.PORT || 4000
await connectDB()

// Middlewares
app.use(express.json())
app.use(cookieParser())
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
// API EndPoints
app.get('/',(req, res)=>res.send("API Working"))



app.use("/api/layout", layoutRoutes);
app.use("/api/pages", pageRoutes);




app.listen(port, ()=>{
    console.log(`Server is running on PORT: ${port}`);
    
})