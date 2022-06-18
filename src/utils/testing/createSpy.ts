import { ISpy } from "#declarations/jest"

export const createSpy = (): ISpy => {
  let hasBeenCalled = false
  let receivedArguments: any[] = []
  let returnValue: unknown
  return {
    checkIfItHasBeenCalled() {
      return hasBeenCalled
    },
    fn(...args) {
      hasBeenCalled = true
      receivedArguments = args
      return returnValue
    },
    getReceivedArguments() {
      return receivedArguments
    },
    stubReturnValue(aReturnValue: unknown) {
      returnValue = aReturnValue
    },
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
