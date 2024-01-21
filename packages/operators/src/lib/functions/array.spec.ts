import { of } from 'rxjs';

import {
  arrayForEach,
  arrayMap,
  arrayReduce,
  arrayFilter,
  arrayFind,
  arrayFindIndex,
  arrayEvery,
  arraySome,
} from './array';

describe('Array Operators', () => {
  const input = [1, 2, 3, 4, 5];

  describe('arrayForEach', () => {
    it('should iterate over each element in the array', (done) => {
      const actualResult: number[] = [];
      const expectedResult = input;

      of(input)
        .pipe(arrayForEach())
        .subscribe({
          next: (value) => actualResult.push(value),
          complete: () => {
            expect(actualResult).toEqual(expectedResult);
            done();
          },
        });
    });
  });

  describe('arrayMap', () => {
    it('should map each element in the array', (done) => {
      const actualResult: number[] = [];
      const expectedResult = input.map((x) => x * 2);

      of(input)
        .pipe(arrayMap((x) => x * 2))
        .subscribe({
          next: (value) => actualResult.push(...value),
          complete: () => {
            expect(actualResult).toEqual(expectedResult);
            done();
          },
        });
    });
  });

  describe('arrayReduce', () => {
    it('should reduce the array to a single value', (done) => {
      let actualResult: number = 0;
      const expectedResult = input.reduce((acc, value) => acc + value, 0);

      of(input)
        .pipe(arrayReduce((acc, value) => acc + value, 0))
        .subscribe({
          next: (result) => {
            actualResult = result;
          },
          complete: () => {
            expect(actualResult).toEqual(expectedResult);
            done();
          },
        });
    });
  });

  describe('arrayFilter', () => {
    it('should filter elements in the array', (done) => {
      const actualResult: number[] = [];
      const expectedResult = input.filter((x) => x % 2 === 0);

      of(input)
        .pipe(arrayFilter((x) => x % 2 === 0))
        .subscribe({
          next: (value) => actualResult.push(...value),
          complete: () => {
            expect(actualResult).toEqual(expectedResult);
            done();
          },
        });
    });
  });

  describe('arrayFind', () => {
    it('should find the first element in the array', (done) => {
      let actualResult: number | undefined;
      const expectedResult = 3;
      of(input)
        .pipe(arrayFind((x) => x > 2))
        .subscribe({
          next: (result) => {
            actualResult = result;
          },
          complete: () => {
            expect(actualResult).toEqual(expectedResult);
            done();
          },
        });
    });
  });

  describe('arrayFindIndex', () => {
    it('should find the index of the first element in the array', (done) => {
      let actualResult: number;
      const expectedResult = 2;

      of(input)
        .pipe(arrayFindIndex((x) => x > 2))
        .subscribe({
          next: (result) => {
            actualResult = result;
          },
          complete: () => {
            expect(actualResult).toEqual(expectedResult);
            done();
          },
        });
    });
  });

  describe('arrayEvery', () => {
    it('should check if every element in the array satisfies a predicate', (done) => {
      let actualResult: boolean | undefined;
      const expectedResult = true;

      of(input)
        .pipe(arrayEvery((x) => x > 0))
        .subscribe({
          next: (result) => {
            actualResult = result;
          },
          complete: () => {
            expect(actualResult).toEqual(expectedResult);
            done();
          },
        });
    });
  });

  describe('arraySome', () => {
    it('should check if some element in the array satisfies a predicate', (done) => {
      let actualResult: boolean | undefined;
      const expectedResult = true;

      of(input)
        .pipe(arraySome((x) => x > 3))
        .subscribe({
          next: (result) => {
            actualResult = result;
          },
          complete: () => {
            expect(actualResult).toEqual(expectedResult);
            done();
          },
        });
    });
  });
});
