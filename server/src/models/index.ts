// app/models/index.js
import mongoose from "mongoose";
import User from "./User.model";
import Role from "./Role.model";

const db = { mongoose, User, Role, ROLES: ["user", "admin", "moderator"] };

db.mongoose = mongoose;
db.User = User;
db.Role = Role;

export default db;
