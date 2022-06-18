import { ISpy } from "#declarations/jest"

export const createSpy = (): ISpy => {
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
  CUSTOM_toHaveBeenCalled(aSpy: ISpy) {
    if (aSpy.checkIfItHasBeenCalled()) {
      return { message: () => "Spy was called.", pass: true }
    }
    return { message: () => "Spy was not called.", pass: false }
  },
})
