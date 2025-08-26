const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./data/connection/connection");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigins = [process.env.CLIENT_URL, process.env.CLIENT_URL_2];

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
// app.use(cors());
app.use(morgan("dev"));
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Routes
app.use("/api/user", require("./routes/users"));

// Simple health check endpoint
app.get("/health", (req, res) => {
    res.send("API Server is running!");
});

// Central error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
