import * as fs from 'fs';
import * as path from 'path';

const LOG_DIR = path.join(__dirname, '../logs');
const LOG_FILE = path.join(LOG_DIR, 'e2e.log');
if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });

function write(level: string, message: string) {
  const line = `[${new Date().toISOString()}] [${level}] ${message}`;
  console.log(line);
  fs.appendFileSync(LOG_FILE, line + '\n');
}

export const logger = {
  info: (msg: string) => write('INFO', msg),
  warn: (msg: string) => write('WARN', msg),
  error: (msg: string) => write('ERROR', msg),
  debug: (msg: string) => write('DEBUG', msg),
};