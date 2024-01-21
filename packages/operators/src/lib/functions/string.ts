import { OperatorFunction, map } from 'rxjs';

/**
 * Splits a string into an array of substrings based on the specified separator.
 * @param {string | RegExp} separator - The string or regular expression used to determine the split points.
 * @param {number} [limit] - A value used to limit the number of elements returned in the array.
 * @returns An operator function for string splitting.
 */
export const stringSplit = (
  separator: string | RegExp,
  limit?: number
): OperatorFunction<string, string[]> => {
  return (source$) => {
    return source$.pipe(map((str) => str.split(separator, limit)));
  };
};

/**
 * Replaces occurrences of a specified value or pattern with another value.
 * @param {string | RegExp} searchValue - The value or pattern to search for.
 * @param {string} replaceValue - The value to replace occurrences with.
 * @returns An operator function for string replacement.
 */
export const stringReplace = (
  searchValue: string | RegExp,
  replaceValue: string
): OperatorFunction<string, string> => {
  return (source$) => {
    return source$.pipe(map((str) => str.replace(searchValue, replaceValue)));
  };
};

/**
 * Retrieves the character at the specified index in the string.
 * @param {number} index - The index of the character to retrieve.
 * @returns An operator function for accessing characters by index.
 */
export const stringAt = (
  index: number
): OperatorFunction<string, string | undefined> => {
  return (source$) => {
    return source$.pipe(map((str) => str.at(index)));
  };
};

/**
 * Checks if a string contains the specified substring.
 * @param {string} searchString - The substring to search for.
 * @param {number} [position] - An optional position to start the search.
 * @returns An operator function for checking substring inclusion.
 */
export const stringIncludes = (
  searchString: string,
  position?: number
): OperatorFunction<string, boolean> => {
  return (source$) => {
    return source$.pipe(map((str) => str.includes(searchString, position)));
  };
};

/**
 * Searches a string for a match against a regular expression.
 * @param {string | RegExp} regExp - The regular expression to search for.
 * @returns An operator function for string matching.
 */
export const stringMatch = (
  regExp: string | RegExp
): OperatorFunction<string, RegExpMatchArray | null> => {
  return (source$) => {
    return source$.pipe(map((str) => str.match(regExp)));
  };
};

/**
 * Converts all characters in a string to lowercase.
 * @returns An operator function for converting a string to lowercase.
 */
export const stringToLowerCase = (): OperatorFunction<string, string> => {
  return (source$) => {
    return source$.pipe(map((str) => str.toLowerCase()));
  };
};

/**
 * Converts all characters in a string to uppercase.
 * @returns An operator function for converting a string to uppercase.
 */
export const stringToUpperCase = (): OperatorFunction<string, string> => {
  return (source$) => {
    return source$.pipe(map((str) => str.toUpperCase()));
  };
};

/**
 * Removes whitespace from both ends of a string.
 * @returns An operator function for trimming whitespace from a string.
 */
export const stringTrim = (): OperatorFunction<string, string> => {
  return (source$) => {
    return source$.pipe(map((str) => str.trim()));
  };
};
