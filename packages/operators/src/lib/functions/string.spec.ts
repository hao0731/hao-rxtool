import { of } from 'rxjs';
import {
  stringSplit,
  stringReplace,
  stringAt,
  stringIncludes,
  stringMatch,
  stringToLowerCase,
  stringToUpperCase,
  stringTrim,
} from './string';

describe('String Operators', () => {
  const input = 'Hello, World!';

  describe('stringSplit', () => {
    it('should split a string into an array of substrings', (done) => {
      const expectedResult = ['Hello', ' World!'];

      of(input)
        .pipe(stringSplit(','))
        .subscribe((actualResult) => {
          expect(actualResult).toEqual(expectedResult);
          done();
        });
    });
  });

  describe('stringReplace', () => {
    it('should replace occurrences of a specified value or pattern', (done) => {
      const expectedResult = 'Hello, Universe!';
      of(input)
        .pipe(stringReplace('World', 'Universe'))
        .subscribe((actualResult) => {
          expect(actualResult).toEqual(expectedResult);
          done();
        });
    });
  });

  describe('stringAt', () => {
    it('should retrieve the character at the specified index', (done) => {
      const expectedResult = 'W';
      of(input)
        .pipe(stringAt(7))
        .subscribe((actualResult) => {
          expect(actualResult).toEqual(expectedResult);
          done();
        });
    });
  });

  describe('stringIncludes', () => {
    it('should check if a string includes the specified substring', (done) => {
      const expectedResult = true;
      of(input)
        .pipe(stringIncludes('World'))
        .subscribe((actualResult) => {
          expect(actualResult).toEqual(expectedResult);
          done();
        });
    });
  });

  describe('stringMatch', () => {
    it('should search a string for a match against a regular expression', (done) => {
      const expectedResult = [ 'o', 'o'];
      of(input)
        .pipe(stringMatch(/o+/g))
        .subscribe((actualResult) => {
          expect(actualResult).toEqual(expectedResult);
          done();
        });
    });
  });

  describe('stringToLowerCase', () => {
    it('should convert all characters in a string to lowercase', (done) => {
      const expectedResult = 'hello, world!';
      of(input)
        .pipe(stringToLowerCase())
        .subscribe((actualResult) => {
          expect(actualResult).toEqual(expectedResult);
          done();
        });
    });
  });

  describe('stringToUpperCase', () => {
    it('should convert all characters in a string to uppercase', (done) => {
      const expectedResult = 'HELLO, WORLD!';
      of(input)
        .pipe(stringToUpperCase())
        .subscribe((actualResult) => {
          expect(actualResult).toEqual(expectedResult);
          done();
        });
    });
  });

  describe('stringTrim', () => {
    it('should remove whitespace from both ends of a string', (done) => {
      const input = '  Trim Me  ';
      const expectedResult = 'Trim Me';
      of(input)
        .pipe(stringTrim())
        .subscribe((actualResult) => {
          expect(actualResult).toEqual(expectedResult);
          done();
        });
    });
  });
});
