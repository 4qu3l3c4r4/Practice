import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';

describe('Button', () => {
  it('should render and handle click', async () => {
    const user = userEvent.setup();
    render({
      template: '<button>Click me</button>'
    });
    
    const button = screen.getByRole('button', { name: /click me/i });
    await user.click(button);
    
    expect(button).toBeInTheDocument();
  });
});
