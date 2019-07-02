/* @flow */

export const next = () => ({ value: undefined, done: true });

export const toEmptyIterator = () => {
  const iterator = {
    [Symbol.iterator]: () => iterator,
    next,
  };

  return iterator;
};
