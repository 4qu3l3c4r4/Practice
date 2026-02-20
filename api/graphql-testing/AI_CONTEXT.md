# AI Context — GraphQL API Testing Template

## Template purpose

Testing GraphQL APIs using graphql-request with TypeScript and Jest.

## Tech stack

- Node.js 18+
- graphql-request 6.x
- Jest 29.x
- TypeScript 5.x

## Code patterns

```typescript
import { request, gql } from 'graphql-request';

const endpoint = process.env.GRAPHQL_ENDPOINT!;

// Query
const query = gql`
  query GetUsers {
    users {
      id
      name
    }
  }
`;
const data = await request(endpoint, query);

// Mutation
const mutation = gql`
  mutation CreateUser($input: UserInput!) {
    createUser(input: $input) {
      id
    }
  }
`;
const result = await request(endpoint, mutation, { input: { name: 'John' } });

// With headers
const headers = { Authorization: `Bearer ${token}` };
const data = await request(endpoint, query, {}, headers);
```

## Rules

- Use gql template tag for queries
- Always type check responses
- Use variables for dynamic values
- Test both queries and mutations
- Validate error responses
