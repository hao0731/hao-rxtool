import { OperatorFunction, map } from 'rxjs';

/**
 * Converts a number to a string with the specified number of decimal places.
 * @param {number} [fractionDigits] - Number of digits after the decimal point. Must be in the range 0 - 20, inclusive.
 * @returns An operator function that transforms numbers into strings.
 */
export const numberToFixed = (
  fractionDigits?: number
): OperatorFunction<number, string> => {
  return (source$) => {
    return source$.pipe(map((num) => num.toFixed(fractionDigits)));
  };
};

/**
 * Converts a number to a string in the specified radix (base).
 * @param {number} [radix] - Specifies a radix for converting numeric values to strings. This value is only used for numbers.
 * @returns An operator function that transforms numbers into strings in the specified radix.
 */
export const numberToString = (
  radix?: number
): OperatorFunction<number, string> => {
  return (source$) => {
    return source$.pipe(map((num) => num.toString(radix)));
  };
};
