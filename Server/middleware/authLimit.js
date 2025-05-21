import rateLimit from "express-rate-limit";

// You can define multiple limiters if needed (e.g., for login)
export async function authLimiter() {
  return rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 5, // limit to 5 requests (e.g., login attempts)
    message: {
      status: 429,
      message: "Too many login attempts. Try again in 10 minutes.",
    },
  });
}
