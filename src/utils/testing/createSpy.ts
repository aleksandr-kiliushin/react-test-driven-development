export const createSpy = () => {
  let receivedArguments: any[] = []
  return {
    fn: (...args: unknown[]) => {
      receivedArguments = args
    },
    getReceivedArguments: () => receivedArguments,
  }
}
