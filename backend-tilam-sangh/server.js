import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import connectDB from './config/connectDB.js'
import layoutRoutes from "./routes/layout.routes.js";





const app = express()
const port = process.env.PORT || 4000
await connectDB()

// Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true, // To send Cookies in Response fron Express App
    origin: ['http://localhost:5173', 'https://tilam-sangh.vercel.app'] // React App Domain
}))

// API EndPoints
app.get('/',(req, res)=>res.send("API Working"))



app.use("/api/layout", layoutRoutes);


// Catch-all route - redirects any unmatched routes to home
app.use((req, res) => {
    res.redirect('/')
})

app.listen(port, ()=>{
    console.log(`Server is running on PORT: ${port}`);
    
})