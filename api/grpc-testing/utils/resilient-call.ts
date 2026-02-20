export function resilientGrpcCall(client: any, method: string, request: any, retries = 3): Promise<any> {
  return new Promise((resolve, reject) => {
    let attempts = 0;

    const makeCall = () => {
      client[method](request, (error: any, response: any) => {
        if (error) {
          attempts++;
          if (attempts < retries) {
            setTimeout(makeCall, 1000 * attempts);
          } else {
            reject(error);
          }
        } else {
          resolve(response);
        }
      });
    };

    makeCall();
  });
}
