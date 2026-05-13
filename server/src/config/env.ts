import dotenv from "dotenv"

dotenv.config()

export const env = {
  MONGODB_URI: process.env.MONGODB_URI!,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  VERSION: process.env.VERSION,
  PEPPER: process.env.PEPPER
}
