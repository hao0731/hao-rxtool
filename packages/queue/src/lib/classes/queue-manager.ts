import { StreamQueueManagerOption, StreamQueueName } from '../interfaces';
import { StreamQueue } from './queue';

export class StreamQueueManager {
  private readonly _queuePool = new Map<StreamQueueName, StreamQueue<any>>();

  constructor(private readonly _options?: StreamQueueManagerOption) {}

  private get _maxPoolSize() {
    return this._options?.poolSize ?? 10;
  }

  set<T>(name: StreamQueueName) {
    if (this._queuePool.has(name)) {
      throw new Error(`The queue ${name} already exists.`);
    }

    if (this._queuePool.size >= this._maxPoolSize) {
      throw new Error(`The queue pool has reached its maximum size.`);
    }

    const queue = new StreamQueue<T>();
    this._queuePool.set(name, queue);

    return queue;
  }

  get<T>(name: StreamQueueName) {
    return this._queuePool.get(name) as StreamQueue<T> | undefined;
  }

  remove(name: StreamQueueName) {
    const queue = this.get(name);
    this._queuePool.delete(name);
    queue?.destroy();
  }

  enqueue<T>(name: StreamQueueName, item: T) {
    const queue = this.getOrSetQueue<T>(name);
    queue.enqueue(item);
  }

  dequeue(name: StreamQueueName) {
    const queue = this.get(name);
    queue?.dequeue();
  }

  enqueueAndWaitDequeue<T>(name: StreamQueueName, item: T) {
    const queue = this.getOrSetQueue<T>(name);
    return queue.enqueueAndWaitDequeue(item);
  }

  clear() {
    Array.from(this._queuePool.keys()).forEach((name) => {
      this.remove(name);
    });
  }

  getDequeueStream<T>(name: StreamQueueName) {
    const queue = this.getOrSetQueue<T>(name);
    return queue.dequeueStream;
  }

  getStatusChange(name: StreamQueueName) {
    const queue = this.getOrSetQueue(name);
    return queue.statusChange;
  }

  private getOrSetQueue<T>(name: StreamQueueName) {
    const queue = this.get<T>(name);

    if (!queue) {
      return this.set<T>(name);
    }

    return queue;
  }
}
