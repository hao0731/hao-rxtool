import { of } from 'rxjs';
import {
  mathAbs,
  mathCeil,
  mathFloor,
  mathPow,
  mathSqrt,
  mathRound,
} from './math';
import { toArray } from 'rxjs/operators';

describe('mathOperators', () => {
  describe('mathAbs', () => {
    it('should calculate the absolute value of numbers', (done) => {
      const input = of(-1, 2);
      const expectedResult = [1, 2];

      input.pipe(mathAbs(), toArray()).subscribe((actualResult) => {
        expect(actualResult).toEqual(expectedResult);
        done();
      });
    });
  });

  describe('mathCeil', () => {
    it('should round numbers up to the nearest integer', (done) => {
      const input = of(1.5, 2.7, -3.3);
      const expectedResult = [2, 3, -3];

      input.pipe(mathCeil(), toArray()).subscribe((actualResult) => {
        expect(actualResult).toEqual(expectedResult);
        done();
      });
    });
  });

  describe('mathFloor', () => {
    it('should round numbers down to the nearest integer', (done) => {
      const input = of(1.5, 2.7, -3.3);
      const expectedResult = [1, 2, -4];

      input.pipe(mathFloor(), toArray()).subscribe((actualResult) => {
        expect(actualResult).toEqual(expectedResult);
        done();
      });
    });
  });

  describe('mathPow', () => {
    it('should calculate the power of numbers', (done) => {
      const input = of(2, 3, 4);
      const expectedResult = [8, 27, 64];

      input.pipe(mathPow(3), toArray()).subscribe((actualResult) => {
        expect(actualResult).toEqual(expectedResult);
        done();
      });
    });
  });

  describe('mathSqrt', () => {
    it('should calculate the square root of numbers', (done) => {
      const input = of(4, 9, 16);
      const expectedResult = [2, 3, 4];

      input.pipe(mathSqrt(), toArray()).subscribe((actualResult) => {
        expect(actualResult).toEqual(expectedResult);
        done();
      });
    });
  });

  describe('mathRound', () => {
    it('should round numbers to the nearest integer', (done) => {
      const input = of(1.3, 2.7, -3.5);
      const expectedResult = [1, 3, -3];

      input.pipe(mathRound(), toArray()).subscribe((actualResult) => {
        expect(actualResult).toEqual(expectedResult);
        done();
      });
    });
  });
});
