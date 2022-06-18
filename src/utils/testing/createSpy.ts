interface Spy {
  fn(...args: unknown[]): void
  getReceivedArguments(): any[]
}

export const createSpy = (): Spy => {
  let receivedArguments: any[] = []
  return {
    fn: (...args) => {
      receivedArguments = args
    },
    getReceivedArguments: () => receivedArguments,
  }
}

expect.extend({
  CUSTOM_toHaveBeenCalled(aSpy: Spy) {
    if (aSpy.getReceivedArguments() === undefined) {
      return { message: () => "Spy was not called.", pass: false }
    }
    return { message: () => "Spy was called.", pass: true }
  },
})
