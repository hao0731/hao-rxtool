import { OperatorFunction, map, tap } from 'rxjs';

/**
 * Gets the value associated with the specified key in a Map.
 * @param key - The key to retrieve the value from the Map.
 * @returns An operator function for get the value from a Map.
 */
export const mapGet = <K, V>(
  key: K
): OperatorFunction<Map<K, V>, V | undefined> => {
  return (source$) => {
    return source$.pipe(map((obj) => obj.get(key)));
  };
};

/**
 * Sets the specified key-value pair in a Map.
 * @param key - The key to set in the Map.
 * @param value - The value to associate with the key in the Map.
 * @returns An operator function for set the value in a Map.
 */
export const mapSet = <K, V>(
  key: K,
  value: V
): OperatorFunction<Map<K, V>, Map<K, V>> => {
  return (source$) => {
    return source$.pipe(tap((obj) => obj.set(key, value)));
  };
};

/**
 * Deletes the specific value from a Map.
 * @param key - The key of specific value.
 * @returns An operator function for delete the value from a Map.
 */
export const mapDelete = <K, V>(
  key: K
): OperatorFunction<Map<K, V>, Map<K, V>> => {
  return (source$) => {
    return source$.pipe(tap((obj) => obj.delete(key)));
  };
};

/**
 * Checks if a Map contains the specified key.
 * @param key - The key to check for in the Map.
 * @returns An operator function for check if a Map contains the specified key.
 */
export const mapHas = <K, V>(key: K): OperatorFunction<Map<K, V>, boolean> => {
  return (source$) => {
    return source$.pipe(map((obj) => obj.has(key)));
  };
};

/**
 * Retrieves an array of keys from a Map.
 * @returns An operator function for retrieve an array of keys from a Map.
 */
export const mapKeys = <K, V>(): OperatorFunction<Map<K, V>, K[]> => {
  return (source$) => {
    return source$.pipe(map((obj) => Array.from(obj.keys())));
  };
};

/**
 * Retrieves an array of values from a Map.
 * @returns An operator function for retrieve an array of values from a Map.
 */
export const mapValues = <K, V>(): OperatorFunction<Map<K, V>, V[]> => {
  return (source$) => {
    return source$.pipe(map((obj) => Array.from(obj.values())));
  };
};

/**
 * Retrieves an array of key-value pairs from a Map.
 * @returns An operator function for retrieve an array of key-value pairs from a Map.
 */
export const mapEntries = <K, V>(): OperatorFunction<Map<K, V>, [K, V][]> => {
  return (source$) => {
    return source$.pipe(map((obj) => Array.from(obj.entries())));
  };
};
