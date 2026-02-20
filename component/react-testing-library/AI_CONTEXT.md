# AI Context — React Testing Library Template

## Template purpose

Component testing for React using Testing Library and Vitest.

## Tech stack

- React 18+
- Testing Library
- Vitest 1.x
- jsdom

## Code patterns

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('component behavior', async () => {
  const user = userEvent.setup();
  render(<MyComponent />);
  
  // Query by role (preferred)
  const button = screen.getByRole('button', { name: /submit/i });
  
  // User interactions
  await user.click(button);
  await user.type(screen.getByLabelText(/email/i), 'test@example.com');
  
  // Assertions
  expect(screen.getByText(/success/i)).toBeInTheDocument();
  
  // Async
  await waitFor(() => {
    expect(screen.getByText(/loaded/i)).toBeInTheDocument();
  });
});
```

## Query priority

1. getByRole
2. getByLabelText
3. getByPlaceholderText
4. getByText
5. getByTestId (last resort)

## Rules

- Use userEvent over fireEvent
- Query by accessibility attributes
- Avoid implementation details
- Test user behavior, not implementation
