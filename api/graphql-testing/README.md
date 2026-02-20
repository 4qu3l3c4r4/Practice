# GraphQL API Testing Template

Testing GraphQL APIs using graphql-request and Jest.

## Setup

```bash
cp .env.example .env
npm install
```

## Configuration

```env
GRAPHQL_ENDPOINT=https://api.example.com/graphql
API_KEY=your-api-key
```

## Run tests

```bash
npm test
npm run test:watch
```

## Writing tests

```typescript
const query = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
    }
  }
`;

const data = await request(endpoint, query, { id: '123' });
expect(data.user.name).toBe('John');
```

## Discovery

```bash
./discover.sh https://api.example.com/graphql
```
