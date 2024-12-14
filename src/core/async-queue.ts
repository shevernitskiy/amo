type AsyncTask<T> = {
  resolve: (value: T) => void;
  reject: () => void;
  fn: CallableFunction;
};

interface AsyncQueue<T> {
  push(fn: () => Promise<T>): Promise<T>;
}

export class BypassQueue<T> implements AsyncQueue<T> {
  push(fn: () => Promise<T>): Promise<T> {
    return fn();
  }
}

export class DelayQueue<T> implements AsyncQueue<T> {
  private stack: AsyncTask<T>[] = [];
  private in_cycle = false;

  constructor(private delay: number) {
    if (delay < 0) throw new Error("Invalid queue delay");
  }

  push(fn: () => Promise<T>): Promise<T> {
    const promise = new Promise<T>((resolve, reject) => this.stack.push({ resolve: resolve, reject: reject, fn: fn }));
    this.resolve();
    return promise;
  }

  private resolve(): void {
    if (this.stack.length === 0 || this.in_cycle) return;

    const promise = this.stack.shift();
    promise?.resolve(promise.fn());

    this.in_cycle = true;
    setTimeout(() => {
      this.in_cycle = false;
      this.resolve();
    }, this.delay);
  }
}

export class ConcurrentPool<T> implements AsyncQueue<T> {
  private stack: AsyncTask<T>[] = [];
  private concurrent = 0;
  private timer = 0;

  constructor(private readonly size: number, private readonly timeframe: number) {
    if (size <= 0) throw new Error("Invalid concurrent pool size");
    if (timeframe <= 0) throw new Error("Invalid concurrent pool timeframe");
  }

  push(fn: () => Promise<T>): Promise<T> {
    const promise = new Promise<T>((resolve, reject) => this.stack.push({ resolve: resolve, reject: reject, fn: fn }));
    this.resolve();
    return promise;
  }

  private resolve() {
    if (this.timer === 0) {
      this.frame();
      this.timer = setInterval(() => this.frame(), this.timeframe);
      return;
    }

    if (this.concurrent < this.size) {
      this.concurrent++;
      const item = this.stack.shift();
      item?.resolve(item.fn());
      return;
    }
  }

  private frame(): void {
    if (this.stack.length === 0) {
      this.concurrent = 0;
      clearInterval(this.timer);
      this.timer = 0;
      return;
    }

    const chunk = this.stack.splice(0, this.size);
    this.concurrent = chunk.length;

    chunk.map((item) => item.resolve(item.fn()));
  }
}
