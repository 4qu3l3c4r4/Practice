// Logger simples para futuros logs e diagnósticos.
// Pode ser estendido para gravar em arquivo ou integrar com relatórios.

export function logInfo(message: string) {
  // eslint-disable-next-line no-console
  console.log(`[INFO] ${message}`);
}

export function logError(message: string) {
  // eslint-disable-next-line no-console
  console.error(`[ERROR] ${message}`);
}

