/* @flow */

import * as either from './Either';

import { getSet } from './getSet';

export interface Maybe<+T> {
  +isJust: boolean;
  +isNothing: boolean;

  map<T1>(transform: (T) => T1): Maybe<T1>;
  mapTo<T1>(value: T1): Maybe<T1>;
  ap<T1>(maybe: Maybe<(T) => T1>): Maybe<T1>;
  chain<T1>(transform: (T) => Maybe<T1>): Maybe<T1>;

  filter(predicate: typeof Boolean): Maybe<$NonMaybeType<T>>;
  filter<P: $Pred<1>>(predicate: P): Maybe<$Refine<T, P, 1>>;

  tap(call: (T) => any): Maybe<T>;

  and<T1>(maybe: Maybe<T1>): Maybe<T1>;
  or<T1>(maybe: Maybe<T1>): Maybe<T1>;
  alt<T1>(maybe: Maybe<T1>): Maybe<T | T1>;

  getOr<T1>(value: T1): T | T1;
  getOrElse<T1>(fn: () => T1): T | T1;
  reduce<T1>(transform: (T1, T) => T1, or: T1): T1;

  toEither<L>(left: L): either.Either<L, T>;

  promise(error?: Error): Promise<T>;
}

class MaybeJust<+T> implements Maybe<T> {
  constructor(value: T) {
    setValue(this, value);
  }

  get isJust() {
    return true;
  }

  get isNothing() {
    return false;
  }

  map<T1>(transform: T => T1): Maybe<T1> {
    return Just(transform(getValue(this)));
  }

  mapTo<T1>(value: T1): Maybe<T1> {
    return Just(value);
  }

  ap<T1>(maybe: Maybe<(T) => T1>): Maybe<T1> {
    return maybe.map(transform => transform(getValue(this)));
  }

  chain<T1>(transform: T => Maybe<T1>): Maybe<T1> {
    return transform(getValue(this));
  }

  filter<P: $Pred<1>>(predicate: P | (T => boolean)): Maybe<$Refine<T, P, 1>> {
    const value = getValue(this);
    return predicate(value) ? Just(value) : nothing;
  }

  tap(call: T => any): Maybe<T> {
    call(getValue(this));
    return this;
  }

  and<T1>(maybe: Maybe<T1>): Maybe<T1> {
    return maybe;
  }

  or<T1>(): Maybe<T1> {
    return this;
  }

  alt<T1>(): Maybe<T | T1> {
    return this;
  }

  getOr(): T {
    return getValue(this);
  }

  getOrElse(): T {
    return getValue(this);
  }

  reduce<T1>(transform: (T1, T) => T1, or: T1): T1 {
    return transform(or, getValue(this));
  }

  toEither<L>(): either.Either<L, T> {
    return either.Right(getValue(this));
  }

  promise(): Promise<T> {
    return Promise.resolve(getValue(this));
  }
}

class MaybeNothing<+T> implements Maybe<T> {
  get isJust() {
    return false;
  }

  get isNothing() {
    return true;
  }

  map() {
    return nothing;
  }

  mapTo() {
    return nothing;
  }

  ap() {
    return nothing;
  }

  chain() {
    return nothing;
  }

  filter() {
    return nothing;
  }

  tap() {
    return nothing;
  }

  and() {
    return nothing;
  }

  or<T1>(maybe: Maybe<T1>): Maybe<T1> {
    return maybe;
  }

  alt<T1>(maybe: Maybe<T1>): Maybe<T | T1> {
    return maybe;
  }

  getOr<T1>(value: T1): T1 {
    return value;
  }

  getOrElse<T1>(fn: () => T1): T1 {
    return fn();
  }

  reduce<T1>(transform: (T1, T) => T1, or: T1): T1 {
    return or;
  }

  toEither<L>(left: L): either.Either<L, T> {
    return either.Left(left);
  }

  promise(error?: Error): Promise<T> {
    return Promise.reject(error);
  }
}

export const nothing: Maybe<any> = new MaybeNothing();

const [getValue, setValue]: [
  <T>(MaybeJust<T>) => T,
  <T>(MaybeJust<T>, T) => T,
] = getSet('value');

export const Just = <T>(value: T): Maybe<T> => new MaybeJust(value);
export const Nothing = <T>(/* :: value: T */): Maybe<T> => nothing;

export const fromNullable = <T>(value: ?T): Maybe<T> =>
  value == null ? nothing : Just(value);

export const opt = fromNullable;

declare export function when<V>(condition: boolean, value: V): Maybe<V>;
declare export function when<V>(
  predicate: typeof Boolean,
  value: V,
): Maybe<$NonMaybeType<V>>;
declare export function when<P: $Pred<1>, V>(
  predicate: P,
  value: V,
): Maybe<$Refine<V, P, 1>>;

export function when<V>(
  predicate: boolean | (V => boolean),
  value: V,
): Maybe<V> {
  const condition =
    typeof predicate == 'boolean' ? predicate : predicate(value);
  return condition ? Just(value) : nothing;
}
