import { Request, Response } from "express";
import dotenv from "dotenv";
import db from "../models/index";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

dotenv.config();

const User = db.User;
const Role = db.Role;

export const signup = async (req: Request, res: Response) => {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const role = await Role.findOne({ name: "user" });
    if (!role) {
      return res.status(500).json({ message: "Default role not found." });
    }
    user.roles = [role._id];

    // Save user to the database
    await user.save();

    // Generate JWT for the new user
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      algorithm: "HS256",
      expiresIn: 86400, // 24 hours
    });

    // Extract user roles
    const authorities =
      Array.isArray(user.roles) && user.roles.length > 0
        ? [`ROLE_USER`] // or fetch role names if you want
        : [];

    res.status(201).json({
      message: "User was registered successfully!",
      id: user._id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email }).populate(
      "roles",
      "-__v"
    );

    if (!user) {
      return res.status(404).json({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).json({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      algorithm: "HS256",
      expiresIn: 86400, // 24 hours
    });

    // Extract user roles
    const authorities =
      Array.isArray(user.roles) && user.roles.length > 0
        ? user.roles.map((role: any) => `ROLE_${role.name.toUpperCase()}`)
        : [];

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
