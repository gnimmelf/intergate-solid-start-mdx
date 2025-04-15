type DebouncedFunction<Args extends any[]> = {
  (...args: Args): void;
  timeoutId?: ReturnType<typeof setTimeout>;
  cancel(): void;
};

export function debounce<Args extends any[], Return>(
  fn: (...args: Args) => Return,
  delay: number
): DebouncedFunction<Args> {
  const debounced = function (this: DebouncedFunction<Args>, ...args: Args): void {
    if (this.timeoutId !== undefined) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      fn(...args);
      this.timeoutId = undefined;
    }, delay);
  } as DebouncedFunction<Args>;

  debounced.cancel = function () {
    if (this.timeoutId !== undefined) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  };

  return debounced;
}
