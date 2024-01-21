import { of } from 'rxjs';
import { filterDefined, filterNonNullable } from './utility';

describe('Utility Operators', () => {
  describe('filterDefined', () => {
    it('should filter out null or undefined values', (done) => {
      const source$ = of(1, null, 2, undefined, 3, null, 4);
      const actualResult: number[] = [];
      const expectedResult = [1, 2, 3, 4];

      source$.pipe(filterDefined()).subscribe({
        next: (value) => {
          actualResult.push(value);
        },
        complete: () => {
          expect(actualResult).toEqual(expectedResult);
          done();
        },
      });
    });
  });

  describe('filterNonNullable', () => {
    it('should filter out null values', (done) => {
      const source$ = of(1, null, 2, null, 3, 4, null);
      const actualResult: number[] = [];
      const expectedResult = [1, 2, 3, 4];

      source$.pipe(filterNonNullable()).subscribe({
        next: (value) => {
          actualResult.push(value);
        },
        complete: () => {
          expect(actualResult).toEqual(expectedResult);
          done();
        },
      });
    });
  });
});
