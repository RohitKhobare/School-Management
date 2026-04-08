import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "./models/user.js";

dotenv.config();

/**
 * Seed script to create admin user
 * Run: node seedAdmin.js
 */

const createAdminUser = async () => {
  try {
    // Validate environment variables
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL environment variable is required");
    }
    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
      throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD environment variables are required");
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Connected to MongoDB");

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Validate password strength
    if (adminPassword.length < 8) {
      throw new Error("Admin password must be at least 8 characters long");
    }

    // Check if admin already exists
    const adminExists = await User.findOne({ email: adminEmail });
    if (adminExists) {
      console.log("⚠️  Admin user already exists!");
      console.log(`Email: ${adminEmail}`);
      console.log("Password: [HIDDEN FOR SECURITY]");
      await mongoose.disconnect();
      return;
    }

    // Hash password with higher salt rounds for admin
    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    // Create admin user
    const admin = await User.create({
      name: "Admin User",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin user created successfully!");
    console.log("\n📋 Admin Credentials:");
    console.log("━━━━━━━━━━━━━━━━━━━━");
    console.log(`Email:    ${adminEmail}`);
    console.log("Password: [HIDDEN FOR SECURITY]");
    console.log("Role:     admin");
    console.log("━━━━━━━━━━━━━━━━━━━━\n");
    console.log("🔐 Login URL: http://localhost:5173 (or your frontend URL)");

    await mongoose.disconnect();
    console.log("✅ Disconnected from MongoDB");
  } catch (error) {
    console.error("❌ Error creating admin user:", error.message);
    process.exit(1);
  }
};

createAdminUser();