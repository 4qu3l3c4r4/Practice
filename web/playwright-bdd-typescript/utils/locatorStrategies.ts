export type ElementType = 'input' | 'button' | 'link' | 'text' | 'container';

export const locatorMap: Record<ElementType, (id: string) => string[]> = {
  input: (id) => [`[data-test-id="${id}"]`, `[data-testid="${id}"]`, `#${id}`, `[name="${id}"]`],
  button: (id) => [`[data-test-id="${id}"]`, `[data-testid="${id}"]`, `button:has-text("${id}")`],
  link: (id) => [`[data-test-id="${id}"]`, `a:has-text("${id}")`],
  text: (id) => [`[data-test-id="${id}"]`, `text=${id}`],
  container: (id) => [`[data-test-id="${id}"]`, `[data-testid="${id}"]`, `#${id}`],
};