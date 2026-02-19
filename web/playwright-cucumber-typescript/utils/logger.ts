import fs from 'fs';
import path from 'path';

class Logger {
  private logFile: string;

  constructor() {
    const logsDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    this.logFile = path.join(logsDir, 'e2e.log');
  }

  private writeLog(level: string, message: string) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${level}: ${message}\n`;
    
    console.log(`${level}: ${message}`);
    fs.appendFileSync(this.logFile, logEntry);
  }

  info(message: string) {
    this.writeLog('INFO', message);
  }

  warn(message: string) {
    this.writeLog('WARN', message);
  }

  error(message: string) {
    this.writeLog('ERROR', message);
  }

  debug(message: string) {
    this.writeLog('DEBUG', message);
  }

  testStep(message: string) {
    this.writeLog('TEST', message);
  }
}

export const logger = new Logger();