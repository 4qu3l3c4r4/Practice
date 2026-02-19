import { config } from 'dotenv';
config();

export function getBaseUrl(): string {
  return process.env.BASE_URL || 'http://localhost:3000';
}

export function getLoginUrl(): string {
  return `${getBaseUrl()}${process.env.LOGIN_PATH || '/login'}`;
}