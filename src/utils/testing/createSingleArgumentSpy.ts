export const createSingleArgumentSpy = () => {
  let getReceivedArgument: any
  return {
    fn: (arg: unknown) => {
      getReceivedArgument = arg
    },
    getReceivedArgument: () => getReceivedArgument,
  }
}
