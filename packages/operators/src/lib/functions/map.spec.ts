import { of } from 'rxjs';
import {
  mapGet,
  mapSet,
  mapDelete,
  mapHas,
  mapKeys,
  mapValues,
  mapEntries,
} from './map';

describe('Map Operators', () => {
  describe('mapGet', () => {
    it('should retrieve the value associated with the specified key', (done) => {
      const key = 'testKey';
      const value = 42;
      const map = new Map<string, number>([[key, value]]);
      const expectedResult = value;

      of(map)
        .pipe(mapGet(key))
        .subscribe((actualResult) => {
          expect(actualResult).toBe(expectedResult);
          done();
        });
    });
  });

  describe('mapSet', () => {
    it('should set the specified key-value pair in a Map', (done) => {
      const key = 'testKey';
      const value = 42;
      const map = new Map<string, number>();
      const expectedResult = value;

      of(map)
        .pipe(mapSet(key, value))
        .subscribe((actualResult) => {
          expect(actualResult.get(key)).toBe(expectedResult);
          done();
        });
    });
  });

  describe('mapDelete', () => {
    it('should delete the specified value from a Map', (done) => {
      const key = 'testKey';
      const value = 42;
      const map = new Map<string, number>([[key, value]]);
      const expectedResult = false;

      of(map)
        .pipe(mapDelete(key))
        .subscribe((actualResult) => {
          expect(actualResult.has(key)).toBe(expectedResult);
          done();
        });
    });
  });

  describe('mapHas', () => {
    it('should check if a Map contains the specified key', (done) => {
      const key = 'testKey';
      const map = new Map<string, number>([[key, 42]]);
      const expectedResult = true;

      of(map)
        .pipe(mapHas(key))
        .subscribe((actualResult) => {
          expect(actualResult).toBe(expectedResult);
          done();
        });
    });
  });

  describe('mapKeys', () => {
    it('should retrieve an array of keys from a Map', (done) => {
      const map = new Map<string, number>([
        ['key1', 1],
        ['key2', 2],
      ]);
      const expectedResult = ['key1', 'key2'];

      of(map)
        .pipe(mapKeys())
        .subscribe((actualResult) => {
          expect(actualResult).toEqual(expectedResult);
          done();
        });
    });
  });

  describe('mapValues', () => {
    it('should retrieve an array of values from a Map', (done) => {
      const map = new Map<string, number>([
        ['key1', 1],
        ['key2', 2],
      ]);
      const expectedResult = [1, 2];

      of(map)
        .pipe(mapValues())
        .subscribe((actualResult) => {
          expect(actualResult).toEqual(expectedResult);
          done();
        });
    });
  });

  describe('mapEntries', () => {
    it('should retrieve an array of key-value pairs from a Map', (done) => {
      const map = new Map<string, number>([
        ['key1', 1],
        ['key2', 2],
      ]);
      const expectedResult = [
        ['key1', 1],
        ['key2', 2],
      ];

      of(map)
        .pipe(mapEntries())
        .subscribe((actualResult) => {
          expect(actualResult).toEqual(expectedResult);
          done();
        });
    });
  });
});
