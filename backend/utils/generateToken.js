import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/envVars.js';

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, {
    expiresIn: '15d',
  });

  res.cookie('jwt-netflix', token, {
    maxAge: 14 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: ENV_VARS.NODE_ENV === 'production',
    sameSite: 'strict'
  });

  return token;
}