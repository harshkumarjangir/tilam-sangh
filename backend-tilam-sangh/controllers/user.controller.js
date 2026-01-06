import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select("-password")
            .sort({ createdAt: -1 })
            .lean();

        res.json({ success: true, data: users });
    } catch (error) {
        console.error("Get all users error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get user by ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password").lean();

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, data: user });
    } catch (error) {
        console.error("Get user by ID error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create new user
export const createUser = async (req, res) => {
    try {
        const { name, email, password, role, permissions } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and password are required"
            });
        }

        // Only admin can create users
        if (req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: "Not authorized to create new users" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User with this email already exists"
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || "admin",
            permissions: permissions || []
        });

        // Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(201).json({ success: true, data: userResponse });
    } catch (error) {
        console.error("Create user error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update user
export const updateUser = async (req, res) => {
    try {
        const { name, email, role, permissions } = req.body;

        const userToUpdate = await User.findById(req.params.id);
        if (!userToUpdate) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Prevent subadmin from updating admin
        if (req.user.role !== 'admin' && userToUpdate.role === 'admin' && req.user._id.toString() !== req.params.id) {
            return res.status(403).json({ success: false, message: "Not authorized to update an admin" });
        }

        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (email !== undefined) updateData.email = email;

        // Only admin can update role and permissions
        if (req.user.role === 'admin') {
            if (role !== undefined) updateData.role = role;
            if (permissions !== undefined) updateData.permissions = permissions;
        } else if (role !== undefined || permissions !== undefined) {
            return res.status(403).json({ success: false, message: "Not authorized to update role or permissions" });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updateData },
            { new: true, runValidators: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, data: user });
    } catch (error) {
        console.error("Update user error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Change password
export const changePassword = async (req, res) => {
    try {
        const { newPassword } = req.body;

        if (!newPassword) {
            return res.status(400).json({
                success: false,
                message: "New password is required"
            });
        }

        const userToUpdate = await User.findById(req.params.id);
        if (!userToUpdate) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Prevent subadmin from changing admin password
        if (req.user.role !== 'admin' && userToUpdate.role === 'admin' && req.user._id.toString() !== req.params.id) {
            return res.status(403).json({ success: false, message: "Not authorized to change admin password" });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: { password: hashedPassword } },
            { new: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, message: "Password changed successfully" });
    } catch (error) {
        console.error("Change password error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete user
export const deleteUser = async (req, res) => {
    try {
        // Prevent self-deletion
        if (req.user._id.toString() === req.params.id) {
            return res.status(400).json({ success: false, message: "You cannot delete your own account" });
        }

        const userToDelete = await User.findById(req.params.id);

        if (!userToDelete) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Prevent subadmin from deleting admin
        // Assuming 'admin' is the highest role. If req.user is an admin, they can delete anyone (except themselves).
        // If req.user is NOT an admin (e.g. subadmin), they cannot delete an admin.
        if (req.user.role !== 'admin' && userToDelete.role === 'admin') {
            return res.status(403).json({ success: false, message: "Not authorized to delete an admin" });
        }

        await User.findByIdAndDelete(req.params.id);

        res.json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        console.error("Delete user error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
