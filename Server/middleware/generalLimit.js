import rateLimit from "express-rate-limit";

// General rate limiter (can be reused for multiple routes)
export async function generalLimiter() {
  return rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per window
    message: {
      status: 429,
      message: "Too many requests, please try again later.",
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
}


