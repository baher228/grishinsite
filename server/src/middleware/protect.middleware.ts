import { Request, Response, NextFunction } from "express";
import { db } from "../db";
import jwt from "jsonwebtoken";
import { User } from "../types/express/index"; // Import User type

export const protectMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string | undefined;

  // Check Authorization header (Bearer) first
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // If not in header, check httpOnly cookie
  if (!token && req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if (typeof decoded !== "object" || !("id" in decoded)) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
    const user = await db.query("SELECT * FROM users WHERE id = $1", [
      (decoded as jwt.JwtPayload).id,
    ]);
    if (user.rows.length === 0) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
    req.user = user.rows[0] as User;
    return next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, token error");
  }
};
