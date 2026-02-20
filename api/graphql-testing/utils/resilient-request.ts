import { request } from 'graphql-request';

export async function resilientRequest(endpoint, query, variables = {}, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await request(endpoint, query, variables);
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
}
