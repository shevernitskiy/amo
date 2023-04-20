type Resolver<T> = {
  resolve: (value: T) => void;
  reject: () => void;
  callback: CallableFunction;
  args: unknown[];
};

export class AsyncQueue<T> {
  private stack: Resolver<T>[] = [];
  private in_cycle = false;

  constructor(private delay: number) {}

  push(fn: CallableFunction, ...args: unknown[]): Promise<T> {
    const promise = new Promise<T>((resolve, reject) =>
      this.stack.push({ resolve: resolve, reject: reject, callback: fn, args: args })
    );
    this.resolve();
    return promise;
  }

  private resolve(): void {
    if (this.stack.length === 0 || this.in_cycle) return;

    const promise = this.stack.shift();
    promise?.resolve(promise.callback(...promise.args));

    this.in_cycle = true;
    setTimeout(() => {
      this.in_cycle = false;
      this.resolve();
    }, this.delay);
  }
}
