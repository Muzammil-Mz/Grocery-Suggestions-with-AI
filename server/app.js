import express from "express";
import config from "config";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import "./utils/dbConnect.js";
import userRouter from "./controllers/index.js"; // Import user form route

// Fix __dirname for ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = config.get("PORT") || 5005; // Fallback to 5005 if not set

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://grocery.muzammil.xyz"],
    methods: ["GET", "POST"], // ✅ Added GET method
  })
);

// ✅ Serve static files (Only needed for production)
app.use(express.static(path.join(__dirname, "dist")));

// ✅ Test Route
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Hello, server is running!" });
});

// ✅ Form API Route
app.use("/api", userRouter);

// ✅ Serve frontend (Only in production)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
