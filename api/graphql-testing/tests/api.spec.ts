import { request, gql } from 'graphql-request';

const endpoint = process.env.GRAPHQL_ENDPOINT!;

describe('GraphQL API', () => {
  it('should query users', async () => {
    const query = gql`
      query {
        users {
          id
          name
          email
        }
      }
    `;

    const data = await request(endpoint, query);
    expect(data.users).toBeDefined();
    expect(data.users.length).toBeGreaterThan(0);
  });

  it('should create user mutation', async () => {
    const mutation = gql`
      mutation CreateUser($input: UserInput!) {
        createUser(input: $input) {
          id
          name
          email
        }
      }
    `;

    const variables = {
      input: {
        name: 'Test User',
        email: 'test@example.com'
      }
    };

    const data = await request(endpoint, mutation, variables);
    expect(data.createUser.name).toBe('Test User');
  });
});
