export interface Spy {
  checkIfItHasBeenCalled(): boolean
  fn(...args: unknown[]): void
  getReceivedArguments(): any[]
}

declare global {
  namespace jest {
    interface Matchers<R> {
      CUSTOM_toHaveBeenCalled(): void
    }
  }
}
