import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { db } from "../db";
import { User } from "../types/express/index";

export const userProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user as User | undefined;
  if (!user) {
    res.status(401);
    throw new Error("Unauthorized: User not authenticated");
  }
  const email = user.email;
  const dbUser = await db.query(
    "SELECT id, email, name, surname, dob, iin, phone_number FROM users WHERE email = $1",
    [email]
  );
  if (dbUser.rows.length === 0) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json(dbUser);
});
