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

  get whenReadyToDequeue() {
    return this._whenReadyToDequeue$.pipe(map(({ item }) => item));
  }

  get whenDequeued() {
    return this._whenDequeued$.pipe(map(({ item }) => item));
  }

  get statusChange() {
    return this._statusChange$.pipe(distinctUntilChanged());
  }

  enqueue(item: T) {
    const index = ++this._latestIndex;
    this.enqueueWithIndex(item, index);
  }

  dequeue() {
    this._dequeue$.next();
  }

  enqueueAndWaitDequeue(item: T) {
    const index = ++this._latestIndex;
    return new Observable<T>((subscriber) => {
      this._whenDequeued$
        .pipe(
          filter((streamItem) => streamItem.index === index),
          map(({ item }) => item),
          take(1),
        )
        .subscribe(subscriber);
      this.enqueueWithIndex(item, index);
    });
  }

  destroy() {
    this._statusChange$.next(StreamQueueStatus.DESTROY);
    this._statusChange$.complete();
    this._dequeue$.complete();
    this._whenDequeued$.complete();
    this._whenReadyToDequeue$.complete();
  }

  private enqueueWithIndex(item: T, index: number) {
    this._queue$.next({ index, item });
  }

  private registerProcessor() {
    const destroy$ = this._statusChange$.pipe(
      filter((status) => status === StreamQueueStatus.DESTROY),
    );

    this._queue$
      .pipe(
        tap(() => {
          this._statusChange$.next(StreamQueueStatus.PENDING);
        }),
        concatMap((item) => {
          return new Observable<StreamQueueItem<T>>((subscriber) => {
            of(item).pipe(delayWhen(() => this._dequeue$)).subscribe(subscriber);
            this._whenReadyToDequeue$.next(item);
          });
        }),
        takeUntil(destroy$),
      )
      .subscribe({
        next: (item) => {
          const status =
            this._latestIndex === item.index ? StreamQueueStatus.EMPTY : StreamQueueStatus.PENDING;
          this._statusChange$.next(status);
          this._whenDequeued$.next(item);
        },
      });
  }
}
