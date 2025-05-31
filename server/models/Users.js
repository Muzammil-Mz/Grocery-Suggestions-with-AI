import mongoose from "mongoose";

const userInputSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  religion: { type: String, required: true },

  city: { type: String, required: true },
  householdType: { type: String, required: true }, // Example: Apartment, Villa, Shared housing
  familyComposition: { type: String, required: true }, // Example: "Parents & 2 Kids"
  healthGoals: { type: String, required: true },
  dietaryPreference: { type: String, required: true }, // Example: Vegetarian, Vegan, Non-Vegetarian
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  allergies: [{ type: String }], // List of allergies
  healthConditions: [{ type: String }], // Example: ["Diabetes", "Hypertension"]
  createdAt: { type: Date, default: Date.now },
});

const userModel = mongoose.model("users", userInputSchema, "users");

export default userModel;
