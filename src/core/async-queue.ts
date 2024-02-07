type AsyncTask<T> = {
  resolve: (value: T) => void;
  reject: () => void;
  fn: CallableFunction;
};

interface AsyncQueue<T> {
  push(fn: () => Promise<T>): Promise<T>;
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
  private in_cycle = false;
  private start_time = 0;
  private concurrent = 0;

  constructor(private size: number, private timeframe: number) {
    if (size <= 0) throw new Error("Invalid concurrent pool size");
    if (timeframe <= 0) throw new Error("Invalid concurrent pool timeframe");
  }

  push(fn: () => Promise<T>): Promise<T> {
    const promise = new Promise<T>((resolve, reject) => this.stack.push({ resolve: resolve, reject: reject, fn: fn }));
    this.resolve();
    return promise;
  }

  private resolve(): void {
    if (this.in_cycle) return;
    if (this.stack.length === 0) {
      this.start_time = 0;
      this.concurrent = 0;
      return;
    }

    const delta = Date.now() - this.start_time;

    if (this.concurrent < this.size) {
      if (delta > this.timeframe) {
        this.start_time = 0;
        this.concurrent = 0;
      }

      const promise = this.stack.shift();
      promise?.resolve(promise.fn());

      this.concurrent++;
      if (this.concurrent === 1) this.start_time = Date.now();
    } else {
      this.in_cycle = true;
      setTimeout(() => {
        this.in_cycle = false;
        this.start_time = 0;
        this.concurrent = 0;
        this.resolve();
      }, this.timeframe - delta);
    }
  }
}
