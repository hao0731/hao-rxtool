import {
  OperatorFunction,
  concatMap,
  defaultIfEmpty,
  every,
  filter,
  find,
  findIndex,
  from,
  map,
  of,
  pipe,
  scan,
  switchMap,
  take,
  takeLast,
  toArray,
} from 'rxjs';

/**
 * Factory function that creates an array operator by applying the given operator function.
 * @template T - The type of elements in the source array.
 * @template R - The type of elements emitted by the resulting observable.
 * @param {OperatorFunction<T, R>} operator - The operator function to be applied.
 * @returns An array operator function.
 */

export const arrayOperatorFactory = <T, R>(
  operator: OperatorFunction<T, R>
): OperatorFunction<T[], R> => {
  return (source$) => {
    return source$.pipe(
      switchMap((arr) =>
        of(arr).pipe(concatMap((items) => from(items).pipe(operator)))
      )
    );
  };
};

/**
 * Converts an array into an observable, emitting each element individually.
 * @template T - The type of elements in the source array.
 * @returns An operator function for forEach operation.
 */
export const arrayForEach = <T>(): OperatorFunction<T[], T> => {
  return (source$) => {
    return source$.pipe(switchMap((arr) => from(arr)));
  };
};

/**
 * Maps each element of the array using the provided project function and emits the resulting array.
 * @template T - The type of elements in the source array.
 * @template R - The type of elements emitted by the resulting observable.
 * @param {(item: T, index: number) => R} project - The projection function.
 * @returns An operator function for map operation.
 */
export const arrayMap = <T, R>(
  project: (item: T, index: number) => R
): OperatorFunction<T[], R[]> => {
  const operator = pipe(map(project), toArray());
  return arrayOperatorFactory(operator);
};

/**
 * Reduces the array to a single accumulated result using the provided accumulator function.
 * @template T - The type of elements in the source array.
 * @template R - The type of the accumulated result.
 * @param {(acc: R, value: T, index: number) => R} accumulator - The accumulator function.
 * @param {R} defaultValue - The default value for the accumulator.
 * @returns An operator function for reduce operation.
 */
export const arrayReduce = <T, R>(
  accumulator: (acc: R, value: T, index: number) => R,
  defaultValue: R
): OperatorFunction<T[], R> => {
  const operator = pipe(scan(accumulator, defaultValue), takeLast(1));
  return arrayOperatorFactory(operator);;
};

/**
 * Filters elements in the array based on the provided predicate function and emits the resulting array.
 * @template T - The type of elements in the source array.
 * @param {(item: T, index: number) => boolean} predicate - The predicate function.
 * @returns An operator function for filter operation.
 */
export const arrayFilter = <T>(
  predicate: (item: T, index: number) => boolean
): OperatorFunction<T[], T[]> => {
  const operator = pipe(filter(predicate), toArray());
  return arrayOperatorFactory(operator);
};

/**
 * Finds the first element in the array that satisfies the provided predicate function.
 * @template T - The type of elements in the source array.
 * @param {(item: T, index: number) => boolean} predicate - The predicate function.
 * @returns An operator function for find operation.
 */
export const arrayFind = <T>(
  predicate: (item: T, index: number) => boolean
): OperatorFunction<T[], T | undefined> => {
  const operator = pipe(find(predicate));
  return arrayOperatorFactory(operator);;
};

/**
 * Finds the index of the first element in the array that satisfies the provided predicate function.
 * @template T - The type of elements in the source array.
 * @param {(item: T, index: number) => boolean} predicate - The predicate function.
 * @returns An operator function for findIndex operation.
 */
export const arrayFindIndex = <T>(
  predicate: (item: T, index: number) => boolean
): OperatorFunction<T[], number> => {
  const operator = pipe(findIndex(predicate));
  return arrayOperatorFactory(operator);
};

/**
 * Checks if all elements in the array satisfy the provided predicate function.
 * @template T - The type of elements in the source array.
 * @param {(item: T, index: number) => boolean} predicate - The predicate function.
 * @returns An operator function for every operation.
 */
export const arrayEvery = <T>(
  predicate: (item: T, index: number) => boolean
): OperatorFunction<T[], boolean> => {
  const operator = pipe(every(predicate));
  return arrayOperatorFactory(operator);
};

/**
 * Checks if at least one element in the array satisfies the provided predicate function.
 * @template T - The type of elements in the source array.
 * @param {(item: T, index: number) => boolean} predicate - The predicate function.
 * @returns An operator function for some operation.
 */
export const arraySome = <T>(
  predicate: (item: T, index: number) => boolean
): OperatorFunction<T[], boolean> => {
  const operator = pipe(
    filter(predicate),
    take(1),
    map(() => true),
    defaultIfEmpty(false)
  );
  return arrayOperatorFactory(operator);
};
