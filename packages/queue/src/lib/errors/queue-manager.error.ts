import { StreamQueueName } from "../interfaces";

export class ExistQueueError extends Error {
  constructor(name: StreamQueueName) {
    super(`The queue ${name} already exists.`);
  }
}

export class MaximumQueuePoolSizeError extends Error {
  constructor(public readonly poolSize: number) {
    super('The queue pool has reached its maximum size.');
  }
}
