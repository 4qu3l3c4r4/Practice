# Vue Testing Library Template

Component testing for Vue 3 using Testing Library and Vitest.

## Setup

```bash
npm install
```

## Run tests

```bash
npm test
```

## Writing tests

```typescript
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import MyComponent from './MyComponent.vue';

test('component behavior', async () => {
  const user = userEvent.setup();
  render(MyComponent, {
    props: { title: 'Test' }
  });
  
  await user.click(screen.getByRole('button'));
  expect(screen.getByText(/success/i)).toBeInTheDocument();
});
```
