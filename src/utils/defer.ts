export function defer<Args extends any[], Return>(
  fn: (...args: Args) => Return,
  timeout: number = 0
): (...args: Args) => void {
  return (...args: Args): void => {
    setTimeout(() => {
      fn(...args);
    }, timeout);
  };
}