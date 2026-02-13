import * as fs from 'fs';
import * as path from 'path';
import { Page } from '@playwright/test';

const LOG_DIR = path.join(__dirname, '../logs');
const LOG_FILE = path.join(LOG_DIR, 'e2e.log');

if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });

function write(level: string, message: string, ...args: unknown[]) {
  const timestamp = new Date().toISOString();
  const extra = args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ');
  const line = `[${timestamp}] [${level}] ${message}${extra ? ' ' + extra : ''}`;
  console.log(line);
  fs.appendFileSync(LOG_FILE, line + '\n');
}

export const logger = {
  info: (msg: string, ...args: unknown[]) => write('INFO', msg, ...args),
  warn: (msg: string, ...args: unknown[]) => write('WARN', msg, ...args),
  error: (msg: string, ...args: unknown[]) => write('ERROR', msg, ...args),
  debug: (msg: string, ...args: unknown[]) => write('DEBUG', msg, ...args),
  testStep: (step: string, details?: Record<string, unknown>) => write('STEP', step, ...(details ? [details] : [])),

  screenshot: async (page: Page, name: string) => {
    try {
      if (!fs.existsSync('screenshots')) fs.mkdirSync('screenshots', { recursive: true });
      await page.screenshot({ path: `screenshots/${name}-${Date.now()}.png` });
      logger.info(`Screenshot saved: ${name}`);
    } catch (e) {
      logger.error(`Failed to save screenshot: ${(e as Error).message}`);
    }
  },
};
