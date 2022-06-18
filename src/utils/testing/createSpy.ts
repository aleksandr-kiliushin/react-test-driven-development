interface Spy {
  checkIfItHasBeenCalled(): boolean
  fn(...args: unknown[]): void
  getReceivedArguments(): any[]
}

export const createSpy = (): Spy => {
  let receivedArguments: any[] = []
  let hasBeenCalled = false
  return {
    checkIfItHasBeenCalled: () => hasBeenCalled,
    fn: (...args) => {
      hasBeenCalled = true
      receivedArguments = args
    },
    getReceivedArguments: () => receivedArguments,
  }
}

expect.extend({
  CUSTOM_toHaveBeenCalled(aSpy: Spy) {
    if (aSpy.checkIfItHasBeenCalled()) {
      return { message: () => "Spy was called.", pass: true }
    }
    return { message: () => "Spy was not called.", pass: false }
  },
})
