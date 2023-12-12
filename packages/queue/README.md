# @hao-rxtool/queue

This library provides a flexible and easy-to-use stream queue implementation for managing asynchronous tasks.

The library is built on top of [RxJS](https://rxjs.dev/), a powerful library for reactive programming.

## Installation

Install the library using npm:

```bash
npm install @hao-rxtool/queue
```

## StreamQueue

### Overview

The `StreamQueue` class represents a queue that allows enqueueing, dequeuing, and notifying subscribers of its status changes.

It provides a set of observables and methods for interacting with the queue.

### Usage

```typescript
import { StreamQueue, StreamQueueStatus } from '@hao-rxtool/queue';

// Create a new stream queue
const queue = new StreamQueue<number>();

// Listen for status changes
queue.statusChange.subscribe((status) => {
  console.log(`Queue status: ${StreamQueueStatus[status]}`);
});

queue.whenDequeued.subscribe((item) => {
  console.log(`Dequeued item: ${item}`);
});

// Enqueue an item
queue.enqueue(42);

// Dequeue an item
queue.dequeue();

// Destroy the queue when no longer needed
queue.destroy();
```

## StreamQueueManager

### Overview

The `StreamQueueManager` class acts as a manager for multiple `StreamQueue` instances, allowing you to organize and control queues efficiently.

### Usage

```typescript
import { StreamQueueManager, StreamQueueManagerOption } from '@hao-rxtool/queue';

// Create a queue manager with optional options
const options: StreamQueueManagerOption = { poolSize: 5 };
const manager = new StreamQueueManager(options);


const queueName = 'exampleQueue';
// Listen for status changes of a specific queue
manager.statusChange(queueName).subscribe((status) => {
  console.log(`Queue ${queueName} status: ${StreamQueueStatus[status]}`);
});

manager.whenDequeued(queueName).subscribe((item) => {
  console.log(`Dequeued item: ${item}`);
});

// Enqueue an item from a queue
manager.enqueue(queueName, 42);

// Dequeue an item from a queue
manager.dequeue(queueName);

// Clear all queues from the manager
manager.clear();
```

## License

This library is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.
