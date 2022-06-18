export interface ISpy {
  checkIfItHasBeenCalled(): boolean
  fn(...args: unknown[]): any
  getReceivedArguments(): any[]
  stubReturnValue(aReturnValue): void
}

declare global {
  namespace jest {
    interface Matchers<R> {
      CUSTOM_toHaveBeenCalled(): void
    }
  }
}
