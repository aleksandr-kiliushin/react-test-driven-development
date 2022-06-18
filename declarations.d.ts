declare module "*.module.css"

export interface Spy {
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
