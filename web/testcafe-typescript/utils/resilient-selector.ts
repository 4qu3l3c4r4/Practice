import { Selector } from 'testcafe';

/**
 * Self-healing selector — tries data-test-id → role → text → CSS.
 */
export function resilientSelector(opts: {
  testId?: string;
  role?: string;
  text?: string;
  css?: string;
}): Selector {
  if (opts.testId) {
    const sel = Selector(`[data-test-id="${opts.testId}"]`);
    return sel.exists ? sel : fallback(opts);
  }
  return fallback(opts);
}

function fallback(opts: { role?: string; text?: string; css?: string }): Selector {
  if (opts.role) return Selector(`[role="${opts.role}"]`);
  if (opts.text) return Selector('*').withText(opts.text);
  if (opts.css) return Selector(opts.css);
  throw new Error('resilientSelector: no selectors provided');
}
