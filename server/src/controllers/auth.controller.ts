import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { db } from "../db";
import bcrypt from "bcryptjs";
import { generateToken } from "../services/generate-token";

export const userAuth = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  if (user.rows.length === 0) {
    res.status(401);
    throw new Error("Invalid email");
  }
  const isMatch = await bcrypt.compare(password, user.rows[0].password_hash);
  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid password");
  }
  const token = generateToken(user.rows[0].id);
  res.cookie("token", token, {
    httpOnly: true, // prevents JS access
    secure: process.env.NODE_ENV === "production", // use HTTPS in prod
    sameSite: "lax",
    maxAge: 2 * 60 * 60 * 1000, // 2 hours
  });
  res.json({ user: user.rows[0], token: token });
});

export const userRegistration = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, name, surname, password, dob, IIN, phone_number } = req.body;

    const userExists = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (userExists.rows.length > 0) {
      res.status(400);
      throw new Error("User already exists");
    }

    if (
      !email ||
      !name ||
      !surname ||
      !password ||
      !dob ||
      !IIN ||
      !phone_number
    ) {
      res.status(400);
      throw new Error("Please fill in all fields");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.query(
      "INSERT INTO users (email, name, surname, password_hash, dob, iin, phone_number) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [email, name, surname, hashedPassword, dob, IIN, phone_number]
    );
    const token = generateToken(newUser.rows[0].id);
    console.log(token);
    res.status(201).json({
      message: "Registered",
      user: newUser.rows[0],
      token: token,
    });
  }
);
