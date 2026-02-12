import dotenv from 'dotenv';

dotenv.config();

export function getBaseUrl(): string {
  const baseUrl = process.env.BASE_URL;
  if (!baseUrl) {
    throw new Error('BASE_URL environment variable is required');
  }
  return baseUrl;
}

export function getLoginUrl(): string {
  const baseUrl = getBaseUrl();
  const loginPath = process.env.LOGIN_PATH || '/login';
  return `${baseUrl}${loginPath}`;
}