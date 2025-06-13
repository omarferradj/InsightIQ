import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../models/index";

dotenv.config();

const User = db.User;
const Role = db.Role;

// Extend Express Request to include userId and user
interface AuthRequest extends Request {
  userId?: string;
  user?: any;
}

const verifyToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  let token =
    (req.headers["x-access-token"] as string) ||
    (req.headers["authorization"] as string);

  if (!token) {
    return res.status(403).json({ message: "No token provided!" });
  }

  // Remove 'Bearer ' prefix if present
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    req.userId = decoded.id;

    // Fetch user details
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

const isAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    const roles = await Role.find({ _id: { $in: user.roles } });

    const hasAdminRole = roles.some((role: any) => role.name === "admin");

    if (!hasAdminRole) {
      return res.status(403).json({ message: "Require Admin Role!" });
    }

    next();
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

const isModerator = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const roles = await Role.find({ _id: { $in: user.roles } });

    const hasModeratorRole = roles.some(
      (role: any) => role.name === "moderator"
    );

    if (!hasModeratorRole) {
      return res.status(403).json({ message: "Require Moderator Role!" });
    }

    next();
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
};

export default authJwt;
