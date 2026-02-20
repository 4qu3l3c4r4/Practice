# AI Context — gRPC API Testing Template

## Template purpose

Testing gRPC services using @grpc/grpc-js with TypeScript and Jest.

## Tech stack

- Node.js 18+
- @grpc/grpc-js 1.9+
- @grpc/proto-loader 0.7+
- Jest 29.x

## Code patterns

```typescript
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

const packageDefinition = protoLoader.loadSync('./service.proto');
const proto = grpc.loadPackageDefinition(packageDefinition);

const client = new proto.ServiceName(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

// Unary call
client.GetUser({ id: '123' }, (error, response) => {
  expect(response.name).toBe('John');
});

// Server streaming
const call = client.ListUsers({});
call.on('data', (user) => console.log(user));
call.on('end', () => done());
```

## Rules

- Place .proto files in protos/ directory
- Use proto-loader for dynamic loading
- Test all RPC types: unary, streaming, bidirectional
- Handle errors properly
