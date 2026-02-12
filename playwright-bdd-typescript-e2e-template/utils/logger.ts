import * as fs from 'fs';
import * as path from 'path';

const LOG_DIR = 'logs';
const LOG_FILE = path.join(LOG_DIR, 'e2e.log');

function write(level: string, message: string) {
  const line = `[${new Date().toISOString()}] [${level}] ${message}`;
  console.log(line);
  if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });
  fs.appendFileSync(LOG_FILE, line + '\n');
}

export const logger = {
  info: (msg: string) => write('INFO', msg),
  warn: (msg: string) => write('WARN', msg),
  error: (msg: string) => write('ERROR', msg),
};