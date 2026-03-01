import jwt from "jsonwebtoken";

// Extract authenticated clerkId from Clerk JWT token (for Bearer tokens)
export const attachClerkUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(
      "🔍 Authorization Header:",
      authHeader ? authHeader.substring(0, 60) + "..." : "None",
    );

    // Check if Bearer token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("❌ No Bearer token found!");
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Missing Bearer token",
      });
    }

    // Extract token
    const token = authHeader.substring(7); // Remove "Bearer " prefix
    console.log("✅ Token extracted, length:", token.length);

    // Decode JWT WITHOUT verification first (to get userId)
    // In production, verify with CLERK_SECRET_KEY
    const decoded = jwt.decode(token);

    if (!decoded) {
      console.log("❌ Failed to decode JWT token");
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token format",
      });
    }

    console.log("🔍 Decoded Token - sub:", decoded.sub);
    console.log("🔍 Token Issuer:", decoded.iss);

    // Extract userId from JWT 'sub' claim (Clerk uses 'sub' for userId)
    const userId = decoded.sub;

    if (!userId) {
      console.log("❌ No userId in token!");
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No user ID in token",
      });
    }

    // 🔥 Attach Clerk user ID to request
    req.clerkId = userId;
    console.log("✅ Clerk ID attached:", req.clerkId);

    next();
  } catch (error) {
    console.error("❌ Auth Middleware Error:", error.message);
    res.status(401).json({
      success: false,
      message: "Unauthorized: Authentication error",
    });
  }
};
