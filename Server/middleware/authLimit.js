// middleware/authLimiter.js
import rateLimit from "express-rate-limit";

// Export the auth limiter middleware
export const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // limit to 5 requests per window per IP
  message: {
    status: 429,
    message: "Too many login attempts. Try again in 10 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
