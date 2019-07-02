/* @flow */

import { next as nextDone } from './toEmptyIterator';

export const toIterator = <T>(getValue: any => T) =>
  // eslint-disable-next-line no-shadow
  function toIterator(): Iterator<T> {
    let next: () => IteratorResult<T, void> = () => {
      next = nextDone;
      return {
        value: getValue(this),
        done: false,
      };
    };

    const iterator: Iterator<T> = {
      /* :: @@iterator: () => iterator, */
      [Symbol.iterator]: () => iterator,
      next: () => next(),
    };

    return iterator;
  };
