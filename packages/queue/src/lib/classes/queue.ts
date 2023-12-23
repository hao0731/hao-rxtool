import { Observable, ReplaySubject, Subject, of } from 'rxjs';
import {
  concatMap,
  delayWhen,
  distinctUntilChanged,
  filter,
  map,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';

import { StreamQueueItem } from '../interfaces/queue';
import { StreamQueueStatus } from '../enums';

/**
 * Represents a queue that can enqueue, dequeue, and notify subscribers of its status changes.
 * @template T - The type of items in the queue.
 */
export class StreamQueue<T = unknown> {
  private readonly _queue$ = new ReplaySubject<StreamQueueItem<T>>();
  private readonly _dequeue$ = new Subject<void>();
  private readonly _whenDequeued$ = new Subject<StreamQueueItem<T>>();
  private readonly _whenReadyToDequeue$ = new Subject<StreamQueueItem<T>>();
  private readonly _statusChange$ = new Subject<StreamQueueStatus>();

  private _latestIndex = -1;

  constructor() {
    this.registerProcessor();
  }

  /**
   * Gets an observable that notifies when an item is ready to be dequeued.
   * @readonly
   */
  get whenReadyToDequeue() {
    return this._whenReadyToDequeue$.pipe(map(({ item }) => item));
  }

  /**
   * Gets an observable that notifies when an item has been dequeued.
   * @readonly
   */
  get whenDequeued() {
    return this._whenDequeued$.pipe(map(({ item }) => item));
  }

  /**
   * Gets an observable that notifies when the status of the queue changes.
   * @readonly
   */
  get statusChange() {
    return this._statusChange$.pipe(distinctUntilChanged());
  }

  /**
   * Enqueues an item into the queue.
   * @param {T} item - The item to enqueue.
   */
  enqueue(item: T) {
    const index = ++this._latestIndex;
    this.enqueueWithIndex(item, index);
  }

  /**
   * Dequeues an item from the queue.
   */
  dequeue() {
    this._dequeue$.next();
  }

  /**
   * Enqueues an item and waits for it to be dequeued.
   * @param item - The item to enqueue.
   * @returns An observable that emits the item when it is dequeued.
   */
  enqueueAndWaitDequeue(item: T) {
    const index = ++this._latestIndex;
    this.enqueueWithIndex(item, index);
    return this._whenDequeued$.pipe(
      filter((streamItem) => streamItem.index === index),
      map(({ item }) => item),
      take(1)
    );
  }

  /**
   * Destroys the queue, completing all subjects.
   */
  destroy() {
    this._statusChange$.next(StreamQueueStatus.DESTROY);
    this._statusChange$.complete();
    this._dequeue$.complete();
    this._whenDequeued$.complete();
    this._whenReadyToDequeue$.complete();
  }

  /**
   * Enqueues an item with a specified index.
   * @param item - The item to enqueue.
   * @param index - The index of the item.
   */
  private enqueueWithIndex(item: T, index: number) {
    this._queue$.next({ index, item });
  }

  /**
   * Registers the processing function to handle items in the queue.
   */
  private registerProcessor() {
    const destroy$ = this._statusChange$.pipe(
      filter((status) => status === StreamQueueStatus.DESTROY)
    );

    this._queue$
      .pipe(
        tap(() => {
          this._statusChange$.next(StreamQueueStatus.PENDING);
        }),
        concatMap((item) => {
          return new Observable<StreamQueueItem<T>>((subscriber) => {
            of(item)
              .pipe(delayWhen(() => this._dequeue$))
              .subscribe(subscriber);
            this._whenReadyToDequeue$.next(item);
          });
        }),
        takeUntil(destroy$)
      )
      .subscribe({
        next: (item) => {
          const status =
            this._latestIndex === item.index
              ? StreamQueueStatus.EMPTY
              : StreamQueueStatus.PENDING;
          this._statusChange$.next(status);
          this._whenDequeued$.next(item);
        },
      });
  }
}
