import 'dotenv/config';

export const PORT = process.env.PORT || 3000;

export const DB_CREDENTIALS = {
  DB_NAME: process.env.DB_NAME,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
}

export const AUTH_SECRET = process.env.AUTH_SECRET;