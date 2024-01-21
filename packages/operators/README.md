# @hao-rxtool/operators

![Node.js CI](https://github.com/hao0731/hao-rxtool/actions/workflows/node.js.yml/badge.svg)
![NPM version](https://img.shields.io/npm/v/@hao-rxtool/operators.svg?style=flat)

This library provides a set of utility operators built on top of [RxJS](https://rxjs.dev/).

## Installation

Install the library using npm:

```bash
npm install rxjs @hao-rxtool/operators
```

## Operators

* [String](#string)
  * [split](#stringsplit)
  * [replace](#stringreplace)
  * [at](#stringat)
  * [includes](#stringincludes)
  * [match](#stringmatch)
  * [toLowerCase](#stringtolowercase)
  * [toUpperCase](#stringtouppercase)
  * [trim](#stringtrim)
* [Number](#number)
  * [toFixed](#numbertofixed)
  * [toString](#numbertostring)
* [Array](#array)
  * [forEach](#arrayforeach)
  * [map](#arraymap)
  * [reduce](#arrayreduce)
  * [filter](#arrayfilter)
  * [find](#arrayfind)
  * [findIndex](#arrayfindindex)
  * [every](#arrayevery)
  * [some](#arraysome)
* [Map](#map)
  * [get](#mapget)
  * [set](#mapset)
  * [delete](#mapdelete)
  * [has](#maphas)
  * [keys](#mapkeys)
  * [values](#mapvalues)
  * [entries](#mapentries)
* [Math](#math)
  * [abs](#mathabs)
  * [ceil](#mathceil)
  * [floor](#mathfloor)
  * [pow](#mathpow)
  * [sqrt](#mathsqrt)
  * [round](#mathround)
* [Utility](#utility)
  * [filterDefined](#filterdefined)
  * [filterNonNullable](#filternonnullable)


### String

#### stringSplit

Splits a string into an array of substrings based on the specified separator.

```typescript
import { of } from 'rxjs';
import { stringSplit } from '@hao-rxtool/operators';

const input = 'Hello, World!';

of(input).pipe(stringSplit(',')).subscribe((result) => {
  console.log(result); // Output: ['Hello', ' World!']
});
```

#### stringReplace

Replaces occurrences of a specified value or pattern with another value.

```typescript
import { of } from 'rxjs';
import { stringReplace } from '@hao-rxtool/operators';

const input = 'Hello, World!';

of(input).pipe(stringReplace('World', 'Universe')).subscribe((result) => {
  console.log(result); // Output: 'Hello, Universe!'
});
```

#### stringAt

Retrieves the character at the specified index in the string.

```typescript
import { of } from 'rxjs';
import { stringAt } from '@hao-rxtool/operators';

const input = 'Hello, World!';

of(input).pipe(stringAt(1)).subscribe((result) => {
  console.log(result); // Output: 'e'
});
```

#### stringIncludes

Checks if a string contains the specified substring.

```typescript
import { of } from 'rxjs';
import { stringIncludes } from '@hao-rxtool/operators';

const input = 'Hello, World!';

of(input).pipe(stringIncludes('Hello')).subscribe((result) => {
  console.log(result); // Output: true
});
```

#### stringMatch

Searches a string for a match against a regular expression.

```typescript
import { of } from 'rxjs';
import { stringMatch } from '@hao-rxtool/operators';

const input = 'Hello, World!';

of(input).pipe(stringMatch(/o+/g)).subscribe((result) => {
  console.log(result); // Output: ['o', 'o']
});
```

#### stringToLowerCase

Converts all characters in a string to lowercase.

```typescript
import { of } from 'rxjs';
import { stringToLowerCase } from '@hao-rxtool/operators';

const input = 'Hello, World!';

of(input).pipe(stringToLowerCase()).subscribe((result) => {
  console.log(result); // Output: 'hello, world!'
});
```

#### stringToUpperCase

Converts all characters in a string to uppercase.

```typescript
import { of } from 'rxjs';
import { stringToUpperCase } from '@hao-rxtool/operators';

const input = 'Hello, World!';

of(input).pipe(stringToUpperCase()).subscribe((result) => {
  console.log(result); // Output: 'HELLO, WORLD!'
});
```

#### stringTrim

Removes whitespace from both ends of a string.

```typescript
import { of } from 'rxjs';
import { stringTrim } from '@hao-rxtool/operators';

const input = ' Hello, World! ';

of(input).pipe(stringTrim()).subscribe((result) => {
  console.log(result); // Output: 'Hello, World!'
});
```

### Number

#### numberToFixed

Converts a number to a string with the specified number of decimal places.

```typescript
import { of } from 'rxjs';
import { numberToFixed } from '@hao-rxtool/operators';

const input = 12345.6789;

of(input).pipe(numberToFixed(2)).subscribe((value) => {
  console.log(value); // Output: '12345.68'
});
```

#### numberToString

Converts a number to a string in the specified radix (base).

```typescript
import { of } from 'rxjs';
import { numberToString } from '@hao-rxtool/operators';

const input = 12345.6789;

of(input).pipe(numberToString(8)).subscribe((value) => {
  console.log(value); // Output: '30071.5334614374241'
});
```

### Array

#### arrayForEach

Converts an array into an observable, emitting each element individually.

```typescript
import { of } from 'rxjs';
import { arrayForEach } from '@hao-rxtool/operators';

const input = [1, 2, 3, 4, 5];

of(input).pipe(arrayForEach()).subscribe((value) => {
  console.log(value); // Output: 1, 2, 3, 4, 5
});
```

#### arrayMap

Maps each element of the array using the provided project function and emits the resulting array.

```typescript
import { of } from 'rxjs';
import { arrayMap } from '@hao-rxtool/operators';

const input = [1, 2, 3, 4, 5];

of(input).pipe(arrayMap((num) => num * 2)).subscribe((value) => {
  console.log(value); // Output: [2, 4, 6, 8, 10]
});
```

#### arrayReduce

Reduces the array to a single accumulated result using the provided accumulator function.

```typescript
import { of } from 'rxjs';
import { arrayReduce } from '@hao-rxtool/operators';

const input = [1, 2, 3, 4, 5];

of(input).pipe(arrayReduce((acc, value) => acc + value, 0)).subscribe((value) => {
  console.log(value); // Output: 15
});
```

#### arrayFilter

Filters elements in the array based on the provided predicate function and emits the resulting array.

```typescript
import { of } from 'rxjs';
import { arrayFilter } from '@hao-rxtool/operators';

const input = [1, 2, 3, 4, 5];

of(input).pipe(arrayFilter((num) => num > 3)).subscribe((value) => {
  console.log(value); // Output: [4, 5]
});
```

#### arrayFind

Finds the first element in the array that satisfies the provided predicate function.

```typescript
import { of } from 'rxjs';
import { arrayFind } from '@hao-rxtool/operators';

const input = [1, 2, 3, 4, 5];

of(input).pipe(arrayFind((num) => num > 3)).subscribe((value) => {
  console.log(value); // Output: 4
});
```

#### arrayFindIndex

Finds the index of the first element in the array that satisfies the provided predicate function.

```typescript
import { of } from 'rxjs';
import { arrayFindIndex } from '@hao-rxtool/operators';

const input = [1, 2, 3, 4, 5];

of(input).pipe(arrayFindIndex((num) => num > 3)).subscribe((value) => {
  console.log(value); // Output: 3
});
```

#### arrayEvery

Checks if all elements in the array satisfy the provided predicate function.

```typescript
import { of } from 'rxjs';
import { arrayEvery } from '@hao-rxtool/operators';

const input = [1, 2, 3, 4, 5];

of(input).pipe(arrayEvery((num) => num > 3)).subscribe((value) => {
  console.log(value); // Output: false
});
```

#### arraySome

Checks if at least one element in the array satisfies the provided predicate function.

```typescript
import { of } from 'rxjs';
import { arraySome } from '@hao-rxtool/operators';

const input = [1, 2, 3, 4, 5];

of(input).pipe(arraySome((num) => num > 3)).subscribe((value) => {
  console.log(value); // Output: true
});
```

### Map

#### mapGet

Gets the value associated with the specified key in a Map.

```typescript
import { of } from 'rxjs';
import { mapGet } from '@hao-rxtool/operators';

const key = 'test';
const map = new Map<string, number>([[key, 42]]);

of(map).pipe(mapGet(key)).subscribe((value) => {
  console.log(value); // Output: 42
});
```

#### mapSet

Sets the specified key-value pair in a Map.

```typescript
import { of } from 'rxjs';
import { mapSet } from '@hao-rxtool/operators';

const key = 'test';
const map = new Map<string, number>();

of(map).pipe(mapSet(key, 42)).subscribe((value) => {
  console.log(value); // Output: 42
});
```

#### mapDelete

Deletes the specific value from a Map.

```typescript
import { of } from 'rxjs';
import { mapDelete } from '@hao-rxtool/operators';

const key = 'test';
const map = new Map<string, number>([[key, 42]]);

of(map).pipe(mapDelete(key)).subscribe((value) => {
  console.log(value.get(test)); // Output: undefined
});
```

#### mapHas

Checks if a Map contains the specified key.

```typescript
import { of } from 'rxjs';
import { mapHas } from '@hao-rxtool/operators';

const key = 'test';
const map = new Map<string, number>([[key, 42]]);

of(map).pipe(mapHas(key)).subscribe((value) => {
  console.log(value); // Output: true
});
```

#### mapKeys

Retrieves an array of keys from a Map.

```typescript
import { of } from 'rxjs';
import { mapKeys } from '@hao-rxtool/operators';

const map = new Map<string, number>([
  ['key1', 1],
  ['key2', 2],
]);

of(map).pipe(mapKeys()).subscribe((value) => {
  console.log(value); // Output: ['key1', 'key2']
});
```

#### mapValues

Retrieves an array of values from a Map.

```typescript
import { of } from 'rxjs';
import { mapValues } from '@hao-rxtool/operators';

const map = new Map<string, number>([
  ['key1', 1],
  ['key2', 2],
]);

of(map).pipe(mapValues()).subscribe((value) => {
  console.log(value); // Output: [1, 2]
});
```

#### mapEntries

Retrieves an array of key-value pairs from a Map.

```typescript
import { of } from 'rxjs';
import { mapEntries } from '@hao-rxtool/operators';

const map = new Map<string, number>([
  ['key1', 1],
  ['key2', 2],
]);

of(map).pipe(mapEntries()).subscribe((value) => {
  console.log(value); // Output: [['key1', 1], ['key2', 2]]
});
```

### Math

#### mathAbs

Calculate the absolute value of a number.

```typescript
import { of, toArray } from 'rxjs';
import { mathAbs } from '@hao-rxtool/operators';

of(-1, 2).pipe(mathAbs(), toArray()).subscribe((value) => {
  console.log(value); // Output: [1, 2]
});
```

#### mathCeil

Round a number up to the nearest integer.

```typescript
import { of, toArray } from 'rxjs';
import { mathCeil } from '@hao-rxtool/operators';

of(1.5, 2.7, -3.3).pipe(mathCeil(), toArray()).subscribe((value) => {
  console.log(value); // Output: [2, 3, -3]
});
```

#### mathFloor

Round a number down to the nearest integer.

```typescript
import { of, toArray } from 'rxjs';
import { mathFloor } from '@hao-rxtool/operators';

of(1.5, 2.7, -3.3).pipe(mathFloor(), toArray()).subscribe((value) => {
  console.log(value); // Output: [1, 2, -4]
});
```

#### mathPow

Calculate the power of a number.

```typescript
import { of, toArray } from 'rxjs';
import { mathPow } from '@hao-rxtool/operators';

of(2, 3, 4).pipe(mathPow(3), toArray()).subscribe((value) => {
  console.log(value); // Output: [8, 27, 64]
});
```

#### mathSqrt

Calculate the square root of a number.

```typescript
import { of, toArray } from 'rxjs';
import { mathSqrt } from '@hao-rxtool/operators';

of(4, 9, 16).pipe(mathSqrt(), toArray()).subscribe((value) => {
  console.log(value); // Output: [2, 3, 4]
});
```

#### mathRound

Round a number to the nearest integer.

```typescript
import { of, toArray } from 'rxjs';
import { mathRound } from '@hao-rxtool/operators';

of(1.3, 2.7, -3.5).pipe(mathRound(), toArray()).subscribe((value) => {
  console.log(value); // Output: [1, 3, -3]
});
```

### Utility

#### filterDefined

An operator that filters out values that are `null` or `undefined`.

```typescript
import { of } from 'rxjs';
import { filterDefined } from '@hao-rxtool/operators';

of(1, null, 2, undefined, 3, null, 4)
  .pipe(filterDefined())
  .subscribe((value) => {
    console.log(value); // Output: 1, 2, 3, 4
  });
```

#### filterNonNullable

An operator that filters out values that are `null`.

```typescript
import { of } from 'rxjs';
import { filterNonNullable } from '@hao-rxtool/operators';

of(1, null, 2, 3, null, 4)
  .pipe(filterNonNullable())
  .subscribe((value) => {
    console.log(value); // Output: 1, 2, 3, 4
  });
```
## License

This library is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.
