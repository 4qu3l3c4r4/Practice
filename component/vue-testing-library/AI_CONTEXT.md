# AI Context — Vue Testing Library Template

## Template purpose

Component testing for Vue 3 using Testing Library and Vitest.

## Tech stack

- Vue 3+
- Testing Library
- Vitest 1.x
- jsdom

## Code patterns

```typescript
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import MyComponent from './MyComponent.vue';

test('component', async () => {
  const user = userEvent.setup();
  
  render(MyComponent, {
    props: { title: 'Test' },
    slots: { default: 'Content' }
  });
  
  await user.click(screen.getByRole('button'));
  expect(screen.getByText(/test/i)).toBeInTheDocument();
});
```

## Rules

- Use getByRole for queries
- Test user behavior
- Avoid testing implementation details
- Use userEvent for interactions
