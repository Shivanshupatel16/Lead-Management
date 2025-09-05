import jwt from "jsonwebtoken";
import { bad } from "../utils/apiResponse.js";

export const auth = (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return bad(res, "Unauthorized", 401);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (e) {
    return bad(res, "Invalid token", 401);
  }
};
