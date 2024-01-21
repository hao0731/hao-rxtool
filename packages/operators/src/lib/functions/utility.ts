import { OperatorFunction, filter } from 'rxjs';

/**
 * An operator that filters out values that are `null` or `undefined`.
 * @template T - The type of values emitted by the observable.
 * @returns An operator function for filtering defined values.
 */
export const filterDefined = <T>(): OperatorFunction<T | null | undefined, T> => {
  const isDefined = (item: T | null | undefined): item is T =>
    item !== null && item !== undefined;
  return (source$) => {
    return source$.pipe(filter(isDefined));
  };
};

/**
 * An operator that filters out values that are `null`.
 * @template T - The type of values emitted by the observable.
 * @returns An operator function for filtering non-nullable values.
 */
export const filterNonNullable = <T>(): OperatorFunction<T | null, T> => {
  const isNotNull = (item: T | null): item is T => item !== null;
  return (source$) => {
    return source$.pipe(filter(isNotNull));
  };
};
