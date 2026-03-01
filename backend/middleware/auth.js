import { requireAuth, getAuth } from "@clerk/express";

export const protect = requireAuth();

export const attachClerkUser = (req, res, next) => {
  const auth = getAuth(req);

  if (!auth || !auth.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // 🔥 This is what was missing earlier
  req.clerkId = auth.userId;

  next();
};