import { screen } from '@testing-library/vue';

export function resilientQuery(text: string | RegExp) {
  const strategies = [
    () => screen.getByRole('button', { name: text }),
    () => screen.getByRole('link', { name: text }),
    () => screen.getByLabelText(text),
    () => screen.getByText(text),
    () => screen.getByTestId(typeof text === 'string' ? text : text.source)
  ];

  for (const strategy of strategies) {
    try {
      return strategy();
    } catch (e) {
      continue;
    }
  }
  throw new Error(`Element not found: ${text}`);
}
