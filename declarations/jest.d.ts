export interface ISpy {
  checkIfItHasBeenCalled(): boolean
  fn(...args: unknown[]): any
  getReceivedArguments(): any[]
  stubReturnValue(aReturnValue): void
}

declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean
  namespace jest {
    interface Matchers<R> {
      CUSTOM_toHaveBeenCalled(): void
    }
  }
}
