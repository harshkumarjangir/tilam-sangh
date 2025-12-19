import express from "express";
import { getLayoutByLanguage } from "../controllers/layout.controller.js";

const router = express.Router();

// ONE route for Navbar + Footer
router.get("/", getLayoutByLanguage);

export default router;
