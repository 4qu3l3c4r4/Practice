import { config } from 'dotenv';

config();

export const BASE_URL = process.env.BASE_URL || 'https://example.com';
export const UI_USERNAME = process.env.UI_USERNAME || 'test@example.com';
export const UI_PASSWORD = process.env.UI_PASSWORD || 'password123';
export const BROWSER = process.env.BROWSER || 'chrome';