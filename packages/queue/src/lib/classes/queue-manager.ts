import { ExistQueueError, MaximumQueuePoolSizeError } from '../errors';
import { StreamQueueManagerOption, StreamQueueName } from '../interfaces';
import { StreamQueue } from './queue';

/**
 * Represents a manager for managing stream queues.
 */
export class StreamQueueManager {
  private readonly _queuePool = new Map<StreamQueueName, StreamQueue<any>>();

  constructor(private readonly _options?: StreamQueueManagerOption) {}

  /**
   * Retrieves the maximum pool size from the options or defaults to `Infinity`.
   * @readonly
   */
  private get _maxPoolSize() {
    return this._options?.poolSize ?? Infinity;
  }

  /**
   * Adds a new stream queue to the pool with the specified name.
   * @param name - The name of the stream queue.
   * @template T - The type of items in the queue.
   * @throws {Error} If the queue with the given name already exists or if the pool has reached its maximum size.
   * @returns The newly created stream queue.
   */
  set<T>(name: StreamQueueName) {
    if (this._queuePool.has(name)) {
      throw new ExistQueueError(name);
    }

    if (this._queuePool.size >= this._maxPoolSize) {
      throw new MaximumQueuePoolSizeError(this._maxPoolSize);
    }

    const queue = new StreamQueue<T>();
    this._queuePool.set(name, queue);

    return queue;
  }

  /**
   * Retrieves the stream queue with the specified name from the pool.
   * @param name - The name of the stream queue.
   * @template T - The type of items in the queue.
   * @returns The stream queue with the specified name, or `undefined` if not found.
   */
  get<T>(name: StreamQueueName) {
    return this._queuePool.get(name) as StreamQueue<T> | undefined;
  }

  /**
   * Removes the stream queue with the specified name from the pool.
   * @param name - The name of the stream queue to remove.
   */
  remove(name: StreamQueueName) {
    const queue = this.get(name);
    this._queuePool.delete(name);
    queue?.destroy();
  }

  /**
   * Enqueues an item into the stream queue with the specified name.
   * @param name - The name of the stream queue.
   * @param item - The item to enqueue.
   * @template T - The type of items in the queue.
   */
  enqueue<T>(name: StreamQueueName, item: T) {
    const queue = this.getOrSetQueue<T>(name);
    queue.enqueue(item);
  }

  /**
   * Dequeues an item from the stream queue with the specified name.
   * @param name - The name of the stream queue.
   */
  dequeue(name: StreamQueueName) {
    const queue = this.get(name);
    queue?.dequeue();
  }

  /**
   * Enqueues an item into the stream queue and waits for it to be dequeued.
   * @param name - The name of the stream queue.
   * @param item - The item to enqueue.
   * @template T - The type of items in the queue.
   * @returns An observable that emits the item when it is dequeued.
   */
  enqueueAndWaitDequeue<T>(name: StreamQueueName, item: T) {
    const queue = this.getOrSetQueue<T>(name);
    return queue.enqueueAndWaitDequeue(item);
  }

  /**
   * Clears all stream queues from the manager.
   */
  clear() {
    Array.from(this._queuePool.keys()).forEach((name) => {
      this.remove(name);
    });
  }

  /**
   * Gets an observable that notifies when an item is ready to be dequeued.
   * @param name - The name of the stream queue.
   * @template T - The type of items in the queue.
   * @returns An observable that notifies when an item is ready to be dequeued.
   */
  whenReadyToDequeue<T>(name: StreamQueueName) {
    const queue = this.getOrSetQueue<T>(name);
    return queue.whenReadyToDequeue;
  }

  /**
   * Gets an observable that notifies when an item has been dequeued.
   * @param name - The name of the stream queue.
   * @template T - The type of items in the queue.
   * @returns An observable that notifies when an item has been dequeued.
   */
  whenDequeued<T>(name: StreamQueueName) {
    const queue = this.getOrSetQueue<T>(name);
    return queue.whenDequeued;
  }

  /**
   * Gets an observable that notifies when the status of the queue changes.
   * @param name - The name of the stream queue.
   * @returns An observable that notifies when the status of the queue changes.
   */
  statusChange(name: StreamQueueName) {
    const queue = this.getOrSetQueue(name);
    return queue.statusChange;
  }

  /**
   * Get the existing stream queue with the specified name or creates a new one if not found.
   * @param name - The name of the stream queue.
   * @returns The existing or newly created stream queue.
   */
  private getOrSetQueue<T>(name: StreamQueueName) {
    const queue = this.get<T>(name);

    if (!queue) {
      return this.set<T>(name);
    }

    return queue;
  }
}
