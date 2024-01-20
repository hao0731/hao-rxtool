import { OperatorFunction, map } from "rxjs";

/**
 * Calculate the absolute value of a number.
 * @returns An operator function for calculate the absolute value of a number.
 */
export const mathAbs = (): OperatorFunction<number, number> => {
  return (source$) => {
    return source$.pipe(map((num) => Math.abs(num)));
  };
};

/**
 * Round a number up to the nearest integer.
 * @returns An operator function for round a number up to the nearest integer.
 */
export const mathCeil = (): OperatorFunction<number, number> => {
  return (source$) => {
    return source$.pipe(map((num) => Math.ceil(num)));
  };
};

/**
 * Round a number down to the nearest integer.
 * @returns An operator function for round a number down to the nearest integer.
 */
export const mathFloor = (): OperatorFunction<number, number> => {
  return (source$) => {
    return source$.pipe(map((num) => Math.floor(num)));
  };
};

/**
 * Calculate the power of a number.
 * @param y - The exponent to raise the number to.
 * @returns An operator function for calculate the power of a number.
 */
export const mathPow = (y: number): OperatorFunction<number, number> => {
  return (source$) => {
    return source$.pipe(map((num) => Math.pow(num, y)));
  };
};

/**
 * Calculate the square root of a number.
 * @returns An operator function for calculate the square root of a number.
 */
export const mathSqrt = (): OperatorFunction<number, number> => {
  return (source$) => {
    return source$.pipe(map((num) => Math.sqrt(num)));
  };
};

/**
 * Round a number to the nearest integer.
 * @returns An operator function for round a number to the nearest integer.
 */
export const mathRound = (): OperatorFunction<number, number> => {
  return (source$) => {
    return source$.pipe(map((num) => Math.round(num)));
  };
};
