import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { ok, created, bad } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { loginDTO, registerDTO } from "../validators/auth.dto.js";

const sign = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES || "7d" });

export const register = asyncHandler(async (req, res) => {
  const parsed = registerDTO.safeParse(req.body);
  if (!parsed.success) return bad(res, parsed.error.issues[0].message);
  const { name, email, password } = parsed.data;
  const exists = await User.findOne({ email });
  if (exists) return bad(res, "Email already used", 409);
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hash });
  const token = sign(user._id);
  return created(res, { token, user: { id: user._id, name: user.name, email: user.email } }, "Registered");
});

export const login = asyncHandler(async (req, res) => {
  const parsed = loginDTO.safeParse(req.body);
  if (!parsed.success) return bad(res, parsed.error.issues[0].message);
  const { email, password } = parsed.data;
  const user = await User.findOne({ email });
  if (!user) return bad(res, "Invalid credentials", 401);
  const okPass = await bcrypt.compare(password, user.password);
  if (!okPass) return bad(res, "Invalid credentials", 401);
  const token = sign(user._id);
  return ok(res, { token, user: { id: user._id, name: user.name, email: user.email } }, "Logged in");
});
