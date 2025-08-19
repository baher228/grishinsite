import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
export const login = asyncHandler(async (req: Request, res: Response) => {
  console.log("Login attempt - Request body:", {
    username: req.body.username,
    hasPassword: !!req.body.password,
  });

  const { username, password } = req.body;
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const jwtSecret = process.env.JWT_SECRET;

  console.log("Environment check:", {
    hasAdminUsername: !!adminUsername,
    hasAdminPassword: !!adminPassword,
    hasJwtSecret: !!jwtSecret,
  });

  if (!adminUsername || !adminPassword) {
    console.error("Missing admin credentials in environment");
    res.status(500).json({ message: "Admin credentials not configured" });
    return;
  }

  if (!jwtSecret) {
    console.error("Missing JWT_SECRET in environment");
    res.status(500).json({ message: "JWT secret not configured" });
    return;
  }

  if (username === adminUsername && password === adminPassword) {
    try {
      const token = jwt.sign({ username }, jwtSecret, {
        expiresIn: "1h",
      });
      console.log("Login successful for user:", username);
      res.json({ token });
    } catch (error) {
      console.error("JWT signing error:", error);
      res.status(500).json({ message: "Error generating token" });
    }
  } else {
    console.log("Invalid login attempt for username:", username);
    res.status(401).json({ message: "Invalid credentials" });
  }
});
