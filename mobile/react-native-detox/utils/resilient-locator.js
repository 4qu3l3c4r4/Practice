// Self-healing element finder for Detox
export async function resilientElement(strategies) {
  for (const strategy of strategies) {
    try {
      const element = await strategy();
      await expect(element).toBeVisible();
      return element;
    } catch (e) {
      continue;
    }
  }
  throw new Error('Element not found with any strategy');
}

// Usage:
// const button = await resilientElement([
//   () => element(by.id('loginButton')),
//   () => element(by.text('Login')),
//   () => element(by.label('Login'))
// ]);
