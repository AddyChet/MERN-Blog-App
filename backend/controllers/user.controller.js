import { z } from "zod";
import { responseFunction } from "../utils/responseFunction.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const userSchema = z.object({
      firstName: z
        .string()
        .min(3, { message: "First name must be at least 3 characters" })
        .max(80, { message: "First name must be at most 80 characters" }),
      lastName: z
        .string()
        .min(3, { message: "Last name must be at least 3 characters" })
        .max(80, { message: "Last name must be at most 80 characters" }),
      email: z.string().email({ message: "Email must be a valid email address" }),
      password: z
        .string()
        .regex(passwordRegex, {
          message:
            "Password must include at least 8 characters, one letter, one number, and one special character",
        }),
    });

    const result = userSchema.safeParse({
      firstName,
      lastName,
      email,
      password,
    });

    if (!result.success) {
      const errorMessages = result.error.errors.map((err) => err.message);
      return res.status(403).json({ error: errorMessages });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return responseFunction(400, "User with email exists", res);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return responseFunction(201, "Signed up successfully", res, user);
  } catch (error) {
    console.log(`error in signup: ${error.message}`);
    return responseFunction(500, "Internal server error", res);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userSchema = z.object({
      email: z.string().email({ message: "Email must be a valid email address" }),
      password: z
        .string()
        .regex(passwordRegex, {
          message:
            "Password must include at least 8 characters, one letter, one number, and one special character",
        }),
    });

    const result = userSchema.safeParse({ email, password });
    if (!result.success) {
      const errorMessages = result.error.errors.map((err) => err.message);
      return res.status(403).json({ error: errorMessages });
    }

    const user = await User.findOne({ email })
    if (!user) return responseFunction(404, "Invalid Credentials", res);
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword)
      return responseFunction(404, "Invalid Credentials", res);

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return responseFunction(200, "User Logged in successfully", res, user);
  } catch (error) {
    console.log(`error in login: ${error.message}`);
    return responseFunction(500, "Internal server error", res);
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return responseFunction(200, "User Logged out successfully", res);
  } catch (error) {
    console.log(`error in logout: ${error.message}`);
    return responseFunction(500, "Internal server error", res);
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return responseFunction(404, "User not found", res);

    return responseFunction(200, "User authenticated", res, {
      userId: user._id,
    });
  } catch (error) {
    console.log(`Error in checkAuth: ${error.message}`);
    return responseFunction(500, "Internal server error", res);
  }
};
