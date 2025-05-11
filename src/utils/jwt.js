// utils/jwt.js
import jwt from "jsonwebtoken";
import { config } from "../config/env.js"; 

export function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
  };

  const token = jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRATION, // Usando a variável JWT_EXPIRATION do config
  });

  return token;
}

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET); // Usando a variável JWT_SECRET do config
    return decoded;
  } catch (error) {
    throw new Error("Token inválido ou expirado");
  }
}
