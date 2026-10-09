require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");

const app = express();

// ======================================================
// Database
// ======================================================

connectDB();

// ======================================================
// Security Middlewares
// ======================================================

app.use(helmet());

app.use(cors());

app.use(compression());

app.use(morgan("dev"));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many requests. Please try again later.",
    },
});

app.use(limiter);

// ======================================================
// Body Parsers
// ======================================================

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ======================================================
// Health Check
// ======================================================

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "🚀 Smart AI LMS Backend is Running Successfully",
        environment: process.env.NODE_ENV || "development",
        timestamp: new Date(),
    });
});

// ======================================================
// Routes
// ======================================================

// Authentication
app.use("/api/auth", require("./routes/authRoutes"));

// Profile
app.use("/api/profile", require("./routes/profileRoutes"));

// Courses
app.use("/api/courses", require("./routes/courseRoutes"));

// Lessons
app.use("/api/lessons", require("./routes/lessonRoutes"));

// Enrollments
app.use("/api/enrollments", require("./routes/enrollmentRoutes"));

// Quizzes
app.use("/api/quizzes", require("./routes/quizRoutes"));

// Quiz Attempts
app.use("/api/attempts", require("./routes/attemptRoutes"));

// Dashboard
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

// Leaderboard
app.use("/api/leaderboard", require("./routes/leaderboardRoutes"));

// Learning Analytics
app.use("/api/analytics", require("./routes/analyticsRoutes"));

// AI
app.use("/api/ai", require("./routes/aiRoutes"));

// AI Chat
app.use("/api/chat", require("./routes/chatRoutes"));

// Certificates
app.use("/api/certificates", require("./routes/certificateRoutes"));

// Notifications
app.use("/api/notifications", require("./routes/notificationRoutes"));

// Uploads
app.use("/api/upload", require("./routes/uploadRoutes"));

// Teacher Analytics
app.use(
    "/api/teacher-analytics",
    require("./routes/teacherAnalyticsRoutes")
);

// Admin
app.use("/api/admin", require("./routes/adminRoutes"));

// ======================================================
// 404 Handler
// ======================================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route '${req.originalUrl}' not found`,
    });
});

// ======================================================
// Global Error Handler
// ======================================================

app.use((err, req, res, next) => {
    console.error("ERROR:", err);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

// ======================================================
// Start Server
// ======================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`
=====================================================
🚀 Smart AI LMS Backend Started Successfully
=====================================================
🌐 URL          : http://localhost:${PORT}
📦 Environment  : ${process.env.NODE_ENV || "development"}
🛡️ Security     : Enabled
📂 Database     : MongoDB Connected
=====================================================
`);
});