import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateGroceryRecommendations } from "../utils/geminiApi.js"; // AI function
import userModel from "../models/Users.js"; // ✅ Correct Model Import

const router = express.Router();

// Fix __dirname for ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Corrected path to researchData.json
const groceryDataPath = path.join(__dirname, "../assets/researchData.json");

// Read the JSON file safely
let groceryData = [];
try {
  if (fs.existsSync(groceryDataPath)) {
    const fileContent = fs.readFileSync(groceryDataPath, "utf-8");
    groceryData = JSON.parse(fileContent);
  } else {
    console.warn("⚠️ researchData.json file is missing! Using empty dataset.");
  }
} catch (error) {
  console.error("Error reading researchData.json:", error);
  groceryData = []; // Ensure it's an empty array to prevent crashes
}

// ✅ API Route to handle user form submission
router.post("/form", async (req, res) => {
  try {
    const userData = req.body;
    console.log("Received user data:", userData);

    // Ensure required fields are present
    if (!userData.name || !userData.age || !userData.healthGoals) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // ✅ Save user data in MongoDB using `userModel`
    const newUserEntry = new userModel(userData); // ✅ Fixed `userModel` usage
    await newUserEntry.save();

    console.log("✅ User entry saved in DB");

    // ✅ Generate AI-based recommendations
    const recommendations = await generateGroceryRecommendations(
      userData,
      groceryData
    );

    res.status(200).json({
      message: `Hello ${userData.name}, here are your grocery recommendations:\n\n${recommendations}`,
      recommendations,
    });
  } catch (error) {
    console.error("Error processing form submission:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
