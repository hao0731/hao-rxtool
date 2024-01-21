import { numberToFixed, numberToString } from './number';
import { of } from 'rxjs';

describe('Number Operators', () => {
  const input = 12345.6789;

  describe('numberToFixed', () => {
    it('should convert numbers to strings with the specified decimal places', (done) => {
      const expectedResult = '12345.68';

      of(input)
        .pipe(numberToFixed(2))
        .subscribe((actualResult) => {
          expect(actualResult).toBe(expectedResult);
          done();
        });
    });
  });

  describe('numberToString', () => {
    it('should convert numbers to strings in the specified radix', (done) => {
      const expectedResult = '30071.5334614374241';

      of(input)
        .pipe(numberToString(8))
        .subscribe((actualResult) => {
          expect(actualResult).toBe(expectedResult);
          done();
        });
    });
  });
});
