import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "secretKey";

export const authMiddleware = async (req, res, next) => {
  try {
    console.log("Middleware triggered"); // Debugging line

    const token = req.header("Authorization")?.split(" ")[1];
    console.log("Extracted Token:", token); // Check if token is being extracted

    if (!token) {
      return res
        .status(403)
        .json({ success: false, message: "Access denied, no token provided" });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("Decoded token:", decoded); // Check if the decoded token looks correct
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Error in middleware:", error); // Log error if any
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};
