import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

const PROTO_PATH = './protos/service.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDefinition);

describe('gRPC Service', () => {
  let client: any;

  beforeAll(() => {
    client = new proto.YourService(
      process.env.GRPC_ENDPOINT!,
      grpc.credentials.createInsecure()
    );
  });

  it('should call unary RPC', (done) => {
    client.GetUser({ id: '123' }, (error: any, response: any) => {
      expect(error).toBeNull();
      expect(response.name).toBeDefined();
      done();
    });
  });
});
