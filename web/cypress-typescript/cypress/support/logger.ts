const LOG_PREFIX = '[e2e]';

export const logger = {
  info: (msg: string) => console.log(`${LOG_PREFIX} [INFO] ${msg}`),
  warn: (msg: string) => console.warn(`${LOG_PREFIX} [WARN] ${msg}`),
  error: (msg: string) => console.error(`${LOG_PREFIX} [ERROR] ${msg}`),
  debug: (msg: string) => console.debug(`${LOG_PREFIX} [DEBUG] ${msg}`),
};