# gRPC API Testing Template

Testing gRPC services using @grpc/grpc-js.

## Setup

```bash
cp .env.example .env
npm install
```

## Configuration

```env
GRPC_ENDPOINT=localhost:50051
```

## Run tests

```bash
npm test
```

## Writing tests

```typescript
const client = new proto.YourService(
  process.env.GRPC_ENDPOINT,
  grpc.credentials.createInsecure()
);

client.GetUser({ id: '123' }, (error, response) => {
  expect(response.name).toBe('John');
});
```
