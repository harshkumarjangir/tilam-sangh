import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
    let token;

    // Get token from cookie
    token = req.cookies.token;

    if (token) {
        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                return res.status(401).json({ message: "Not authorized, user not found" });
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};

export const admin = (req, res, next) => {
    if (req.user && (req.user.role === "admin" || req.user.role === "subadmin")) {
        next();
    } else {
        res.status(401).json({ message: "Not authorized as an admin" });
    }
};

export const checkPermission = (requiredPermission) => {
    return (req, res, next) => {
        if (req.user && req.user.role === 'admin') {
            next(); // Admin has all permissions
        } else if (req.user && req.user.role === 'subadmin' && req.user.permissions.includes(requiredPermission)) {
            next();
        } else {
            res.status(403).json({ message: "Not authorized to access this resource" });
        }
    };
};
