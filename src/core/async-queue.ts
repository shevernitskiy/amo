type AsyncTask<T> = {
  resolve: (value: T) => void;
  reject: () => void;
  fn: CallableFunction;
  args: unknown[];
};

export class AsyncQueue<T> {
  private stack: AsyncTask<T>[] = [];
  private in_cycle = false;

  constructor(private delay: number) {}

  push(fn: CallableFunction, ...args: unknown[]): Promise<T> {
    const promise = new Promise<T>((resolve, reject) =>
      this.stack.push({ resolve: resolve, reject: reject, fn: fn, args: args })
    );
    this.resolve();
    return promise;
  }

  private resolve(): void {
    if (this.stack.length === 0 || this.in_cycle) return;

    const promise = this.stack.shift();
    promise?.resolve(promise.fn(...promise.args));

    this.in_cycle = true;
    setTimeout(() => {
      this.in_cycle = false;
      this.resolve();
    }, this.delay);
  }
}
