/**
 * Represents an item in the StreamQueue.
 * @template T - The type of the item.
 */
export interface StreamQueueItem<T> {
  index: number;
  item: T;
}
