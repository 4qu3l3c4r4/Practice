# React Testing Library Template

Component testing for React using Testing Library and Vitest.

## Setup

```bash
npm install
```

## Run tests

```bash
npm test
npm run test:ui
```

## Writing tests

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('form submission', async () => {
  const user = userEvent.setup();
  render(<LoginForm />);
  
  await user.type(screen.getByLabelText(/email/i), 'user@test.com');
  await user.click(screen.getByRole('button', { name: /submit/i }));
  
  expect(screen.getByText(/success/i)).toBeInTheDocument();
});
```
