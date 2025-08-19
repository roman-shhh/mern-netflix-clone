import dotenv from 'dotenv';

dotenv.config();

export const ENV_VARS = {
  JWT_SECRET: process.env.JWT_SECRET,
  MONGO_URI: process.env.MONGO_URI,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 3000,
  TMDB_API_KEY: process.env.TMDB_API_KEY
}