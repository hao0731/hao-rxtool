import { ExistQueueError, MaximumQueuePoolSizeError } from '../errors';
import { StreamQueue } from './queue';
import { StreamQueueManager } from './queue-manager';

describe('StreamQueueManager', () => {
  const queueName = 'test';
  const item = 'test';

  let streamQueueManager: StreamQueueManager;
  let queue: StreamQueue;

  beforeEach(() => {
    streamQueueManager = new StreamQueueManager({ poolSize: 3 });
  });

  afterEach(() => {
    streamQueueManager.clear();
  });

  describe('set', () => {
    it('should add a new stream queue to the queue pool.', () => {
      queue = streamQueueManager.set(queueName);

      expect(queue).toBeInstanceOf(StreamQueue);
    });

    it('should throw error if the queue pool has reached its maximum size.', () => {
      streamQueueManager.set('1');
      streamQueueManager.set('2');
      streamQueueManager.set('3');

      const shouldThrowError = () => {
        streamQueueManager.set('4');
      };

      expect(shouldThrowError).toThrow(MaximumQueuePoolSizeError);
    });

    it('should throw error if the stream queue already exists.', () => {
      streamQueueManager.set(queueName);

      const shouldThrowError = () => {
        streamQueueManager.set(queueName);
      };

      expect(shouldThrowError).toThrow(ExistQueueError);
    });
  });

  describe('get', () => {
    it('should return the specific stream queue.', () => {
      streamQueueManager.set(queueName);

      expect(streamQueueManager.get(queueName)).toBeInstanceOf(StreamQueue);
    });

    it('should return undefined if can not find the specific stream queue.', () => {
      expect(streamQueueManager.get(queueName)).toBeUndefined();
    });
  });

  describe('remove', () => {
    let queue: StreamQueue;

    beforeEach(() => {
      queue = streamQueueManager.set(queueName);
    });

    it('should remove the specific stream queue from the queue pool.', () => {
      streamQueueManager.remove(queueName);
      expect(streamQueueManager.get(queueName)).toBeUndefined();
    });

    it('should invoke the destroy method of a specific stream queue.', () => {
      jest.spyOn(queue, 'destroy');

      streamQueueManager.remove(queueName);

      expect(queue.destroy).toHaveBeenCalled();
    });
  });

  describe('enqueue', () => {
    it('should add a new stream queue to the queue pool if the stream queue does not exist.', () => {
      streamQueueManager.enqueue(queueName, item);
      expect(streamQueueManager.get(queueName)).toBeInstanceOf(StreamQueue);
    });

    it('should invoke the enqueue method of a specific stream queue.', () => {
      queue = streamQueueManager.set(queueName);
      jest.spyOn(queue, 'enqueue');

      streamQueueManager.enqueue(queueName, item);

      expect(queue.enqueue).toHaveBeenCalledWith(item);
    });
  });

  describe('dequeue', () => {
    beforeEach(() => {
      queue = streamQueueManager.set(queueName);
    });

    it('should invoke the dequeue method of a specific stream queue if it exists.', () => {
      jest.spyOn(queue, 'dequeue');

      streamQueueManager.dequeue(queueName);

      expect(queue.dequeue).toHaveBeenCalled();
    });
  });

  describe('enqueueAndWaitDequeue', () => {
    it('should add a new stream queue to the queue pool if the stream queue does not exist.', () => {
      streamQueueManager.enqueueAndWaitDequeue(queueName, item);
      expect(streamQueueManager.get(queueName)).toBeInstanceOf(StreamQueue);
    });

    it('should invoke the enqueueAndWaitDequeue method of a specific stream queue.', () => {
      queue = streamQueueManager.set(queueName);
      jest.spyOn(queue, 'enqueueAndWaitDequeue');

      streamQueueManager.enqueueAndWaitDequeue(queueName, item);

      expect(queue.enqueueAndWaitDequeue).toHaveBeenCalledWith(item);
    });
  });

  describe('whenReadyToDequeue', () => {
    it('should add a new stream queue to the queue pool if the stream queue does not exist.', () => {
      streamQueueManager.whenReadyToDequeue(queueName);
      expect(streamQueueManager.get(queueName)).toBeInstanceOf(StreamQueue);
    });

    it('should invoke the whenReadyToDequeue getter of a specific stream queue.', () => {
      queue = streamQueueManager.set(queueName);
      Object.defineProperty(queue, 'whenReadyToDequeue', {
        get: jest.fn(() => 'test'),
      });

      expect(streamQueueManager.whenReadyToDequeue(queueName)).toBe(
        queue.whenReadyToDequeue
      );
    });
  });

  describe('whenDequeued', () => {
    it('should add a new stream queue to the queue pool if the stream queue does not exist.', () => {
      streamQueueManager.whenDequeued(queueName);
      expect(streamQueueManager.get(queueName)).toBeInstanceOf(StreamQueue);
    });

    it('should invoke the whenDequeued getter of a specific stream queue.', () => {
      queue = streamQueueManager.set(queueName);
      Object.defineProperty(queue, 'whenDequeued', {
        get: jest.fn(() => 'test'),
      });

      expect(streamQueueManager.whenDequeued(queueName)).toBe(
        queue.whenDequeued
      );
    });
  });

  describe('statusChange', () => {
    it('should add a new stream queue to the queue pool if the stream queue does not exist.', () => {
      streamQueueManager.statusChange(queueName);
      expect(streamQueueManager.get(queueName)).toBeInstanceOf(StreamQueue);
    });

    it('should invoke the statusChange getter of a specific stream queue.', () => {
      queue = streamQueueManager.set(queueName);
      Object.defineProperty(queue, 'statusChange', {
        get: jest.fn(() => 'test'),
      });

      expect(streamQueueManager.statusChange(queueName)).toBe(
        queue.statusChange
      );
    });
  });
});
