import { TestScheduler } from 'rxjs/testing';
import { StreamQueueStatus } from '../enums';
import { StreamQueue } from './queue';

describe('StreamQueue', () => {
  let streamQueue: StreamQueue<string>;
  let testScheduler: TestScheduler;

  const enqueue = (item = 'test') => {
    streamQueue.enqueue(item);
  };

  const dequeue = () => {
    streamQueue.dequeue();
  };

  beforeEach(() => {
    streamQueue = new StreamQueue<string>();
  });

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  afterEach(() => {
    streamQueue.destroy();
  });

  describe('statusChange', () => {
    it('should receive status based on the current state of the stream queue.', () => {
      testScheduler.run(({ expectObservable, hot }) => {
        const expectedMarbleDiagram = `a--b`;
        const expectedInput = {
          a: StreamQueueStatus.PENDING,
          b: StreamQueueStatus.EMPTY,
        };
        const executionMarbleDiagram = `abcd`;
        const executionInput = {
          a: enqueue,
          b: enqueue,
          c: dequeue,
          d: dequeue,
        };

        hot(executionMarbleDiagram, executionInput).subscribe((exec) => {
          exec();
        });

        expectObservable(streamQueue.statusChange).toBe(
          expectedMarbleDiagram,
          expectedInput
        );
      });
    });
  });

  describe('whenDequeued', () => {
    it('should receive an item that has been dequeued from the stream queue.', () => {
      testScheduler.run(({ expectObservable, hot }) => {
        const expectedMarbleDiagram = `-a--b`;
        const expectedInput = {
          a: '1',
          b: '2',
        };
        const executionMarbleDiagram = `abcde`;
        const executionInput = {
          a: () => enqueue('1'),
          b: dequeue,
          c: () => enqueue('2'),
          d: () => enqueue('3'),
          e: dequeue,
        };

        hot(executionMarbleDiagram, executionInput).subscribe((exec) => {
          exec();
        });

        expectObservable(streamQueue.whenDequeued).toBe(
          expectedMarbleDiagram,
          expectedInput
        );
      });
    });
  });

  describe('whenReadyToDequeue', () => {
    it('should receive an item that is ready to be dequeued from the stream queue.', () => {
      testScheduler.run(({ expectObservable, hot }) => {
        const expectedMarbleDiagram = `a-b-c`;
        const expectedInput = {
          a: '1',
          b: '2',
          c: '3',
        };
        const executionMarbleDiagram = `abcde`;
        const executionInput = {
          a: () => enqueue('1'),
          b: () => enqueue('2'),
          c: dequeue,
          d: () => enqueue('3'),
          e: dequeue,
        };

        hot(executionMarbleDiagram, executionInput).subscribe((exec) => {
          exec();
        });

        expectObservable(streamQueue.whenReadyToDequeue).toBe(
          expectedMarbleDiagram,
          expectedInput
        );
      });
    });
  });

  describe('enqueueAndWaitDequeue', () => {
    it('should enqueue an item and receive it once it has been dequeued.', () => {
      testScheduler.run(({ expectObservable, hot }) => {
        const expectedMarbleDiagram = `--(a|)`;
        const expectedInput = {
          a: '3',
        };
        const executionMarbleDiagram = `abc`;
        const executionInput = {
          a: dequeue,
          b: dequeue,
          c: dequeue,
        };

        enqueue('1');
        enqueue('2');
        const targetObservable$ = streamQueue.enqueueAndWaitDequeue('3');
        hot(executionMarbleDiagram, executionInput).subscribe((exec) => {
          exec();
        });

        expectObservable(targetObservable$).toBe(
          expectedMarbleDiagram,
          expectedInput
        );
      });
    });
  });
});
