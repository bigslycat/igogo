/* @flow */

import { getSet } from './getSet';

import * as maybe from './Maybe';

export interface Either<+L, +R> {
  +isRight: boolean;
  +isLeft: boolean;

  map<R1>(transform: (R) => R1): Either<L, R1>;
  mapR<R1>(transform: (R) => R1): Either<L, R1>;
  mapL<L1>(transform: (L) => L1): Either<L1, R>;
  bimap<L1, R1>(transformL: (L) => L1, transformR: (R) => R1): Either<L1, R1>;

  mapTo<R1>(right: R1): Either<L, R1>;
  mapRTo<R1>(right: R1): Either<L, R1>;
  mapLTo<L1>(left: L1): Either<L1, R>;
  bimapTo<L1, R1>(left: L1, right: R1): Either<L1, R1>;

  chain<L1, R1>(transform: (R) => Either<L1, R1>): Either<L | L1, R1>;
  chainR<L1, R1>(transform: (R) => Either<L1, R1>): Either<L | L1, R1>;
  chainL<L1, R1>(transform: (L) => Either<L1, R1>): Either<L1, R | R1>;
  bichain<L1, R1>(
    transformL: (L) => Either<L1, R1>,
    transformR: (R) => Either<L1, R1>,
  ): Either<L1, R1>;

  ap<L1, R1>(either: Either<L1, (R) => R1>): Either<L | L1, R1>;
  apR<L1, R1>(either: Either<L1, (R) => R1>): Either<L | L1, R1>;
  apL<L1, R1>(either: Either<(L) => L1, R1>): Either<L1, R | R1>;
  biap<L1, R1>(either: Either<(L) => L1, (R) => R1>): Either<L1, R1>;

  alt<L1, R1>(either: Either<L1, R1>): Either<L1, R | R1>;
  or<L1, R1>(either: Either<L1, R1>): Either<L1, R | R1>;
  and<L1, R1>(either: Either<L1, R1>): Either<L | L1, R1>;

  unwrap(): R | L;

  getOr<R1>(value: R1): R | R1;
  getOrElse<R1>(fn: (L) => R1): R | R1;

  getLeftOr<L1>(value: L1): L | L1;
  getLeftOrElse<L1>(fn: () => L1): L | L1;
  getRightOr<R1>(value: R1): R | R1;
  getRightOrElse<R1>(fn: () => R1): R | R1;

  reduce<R1>(transform: (R1, R) => R1, or: R1): R1;
  reduceR<R1>(transform: (R1, R) => R1, or: R1): R1;
  reduceL<L1>(transform: (L1, L) => L1, or: L1): L1;

  tap(call: (R) => mixed): Either<L, R>;
  tapR(call: (R) => mixed): Either<L, R>;
  tapL(call: (L) => mixed): Either<L, R>;
  tapBoth(callL: (L) => mixed, callR: (R) => mixed): Either<L, R>;

  swap(): Either<R, L>;

  left(): maybe.Maybe<L>;
  right(): maybe.Maybe<R>;

  toMaybe(): maybe.Maybe<R>;
  toMaybeR(): maybe.Maybe<R>;
  toMaybeL(): maybe.Maybe<L>;
  toMaybeLR(): maybe.Maybe<L | R>;

  promise(): Promise<R>;

  fold<T>(fromLeft: (L) => T, fromRight: (R) => T): T;
}

class EitherRight<+L, +R> implements Either<L, R> {
  constructor(value: R) {
    setRight(this, value);
  }

  get isRight() {
    return true;
  }

  get isLeft() {
    return false;
  }

  map<R1>(transform: R => R1): Either<L, R1> {
    return this.mapR(transform);
  }

  mapR<R1>(transform: R => R1): Either<L, R1> {
    return new EitherRight(transform(getRight(this)));
  }

  mapL<L1>(): Either<L1, R> {
    return (this: Either<any, R>);
  }

  bimap<L1, R1>(transformL: L => L1, transformR: R => R1): Either<L1, R1> {
    return this.mapR(transformR).mapL(transformL);
  }

  mapTo<R1>(value: R1): Either<L, R1> {
    return Right(value);
  }

  mapRTo<R1>(value: R1): Either<L, R1> {
    return Right(value);
  }

  mapLTo<L1>(): Either<L1, R> {
    return (this: Either<any, R>);
  }

  bimapTo<L1, R1>(left: L1, right: R1): Either<L1, R1> {
    return this.mapRTo(right).mapLTo(left);
  }

  chain<L1, R1>(transform: R => Either<L1, R1>): Either<L | L1, R1> {
    return this.chainR(transform);
  }

  chainR<L1, R1>(transform: R => Either<L1, R1>): Either<L | L1, R1> {
    return transform(getRight(this));
  }

  chainL<L1, R1>(): Either<L1, R | R1> {
    return (this: Either<any, R | R1>);
  }

  bichain<L1, R1>(
    transformL: L => Either<L1, R1>,
    transformR: R => Either<L1, R1>,
  ): Either<L1, R1> {
    return transformR(getRight(this));
  }

  ap<L1, R1>(either: Either<L1, (R) => R1>): Either<L | L1, R1> {
    return this.apR(either);
  }

  apR<L1, R1>(either: Either<L1, (R) => R1>): Either<L | L1, R1> {
    return either.map(transform => transform(getRight(this)));
  }

  apL<L1, R1>(): Either<L1, R | R1> {
    return (this: Either<any, R | R1>);
  }

  biap<L1, R1>(either: Either<(L) => L1, (R) => R1>): Either<L1, R1> {
    return (this.apR(either): Either<any, R1>);
  }

  alt<L1, R1>(): Either<L1, R | R1> {
    return (this: Either<any, R | R1>);
  }

  or<L1, R1>(): Either<L1, R | R1> {
    return (this: Either<any, R | R1>);
  }

  and<L1, R1>(either: Either<L1, R1>): Either<L | L1, R1> {
    return either;
  }

  unwrap(): R {
    return getRight(this);
  }

  getOr(): R {
    return getRight(this);
  }

  getOrElse(): R {
    return getRight(this);
  }

  getLeftOr<L1>(value: L1): L1 {
    return value;
  }

  getLeftOrElse<L1>(fn: () => L1): L1 {
    return fn();
  }

  getRightOr(): R {
    return getRight(this);
  }

  getRightOrElse(): R {
    return getRight(this);
  }

  reduce<R1>(transform: (R1, R) => R1, or: R1): R1 {
    return this.reduceR(transform, or);
  }

  reduceR<R1>(transform: (R1, R) => R1, or: R1): R1 {
    return transform(or, getRight(this));
  }

  reduceL<L1>(transform: (L1, L) => L1, or: L1): L1 {
    return or;
  }

  tap(call: R => any): Either<L, R> {
    return this.tapR(call);
  }

  tapR(call: R => any): Either<L, R> {
    call(getRight(this));
    return this;
  }

  tapL(): Either<L, R> {
    return this;
  }

  tapBoth(callL: L => mixed, callR: R => mixed): Either<L, R> {
    return this.tapR(callR);
  }

  swap(): Either<R, L> {
    return new EitherLeft(getRight(this));
  }

  left(): maybe.Maybe<L> {
    return this.toMaybeL();
  }

  right(): maybe.Maybe<R> {
    return this.toMaybeR();
  }

  toMaybe(): maybe.Maybe<R> {
    return this.toMaybeR();
  }

  toMaybeR(): maybe.Maybe<R> {
    return maybe.Just(getRight(this));
  }

  toMaybeL(): maybe.Maybe<L> {
    return maybe.nothing;
  }

  toMaybeLR(): maybe.Maybe<L | R> {
    return this.toMaybe();
  }

  promise(): Promise<R> {
    return Promise.resolve(getRight(this));
  }

  fold<T>(fromLeft: L => T, fromRight: R => T): T {
    return fromRight(getRight(this));
  }
}

class EitherLeft<+L, +R> implements Either<L, R> {
  constructor(value: L) {
    setLeft(this, value);
  }

  get isRight() {
    return false;
  }

  get isLeft() {
    return true;
  }

  map<R1>(): Either<L, R1> {
    return (this: any);
  }

  mapR<R1>(): Either<L, R1> {
    return (this: any);
  }

  mapL<L1>(transform: L => L1): Either<L1, R> {
    return new EitherLeft(transform(getLeft(this)));
  }

  bimap<L1, R1>(transformL: L => L1, transformR: R => R1): Either<L1, R1> {
    return this.mapL(transformL).mapR(transformR);
  }

  mapTo<R1>(): Either<L, R1> {
    return (this: any);
  }

  mapRTo<R1>(): Either<L, R1> {
    return (this: any);
  }

  mapLTo<L1>(left: L1): Either<L1, R> {
    return new EitherLeft(left);
  }

  bimapTo<L1, R1>(left: L1, right: R1): Either<L1, R1> {
    return this.mapLTo(left).mapRTo(right);
  }

  mapBoth<L1, R1>(transformL: L => L1, transformR: R => R1): Either<L1, R1> {
    return this.bimap(transformL, transformR);
  }

  chain<L1, R1>(): Either<L | L1, R1> {
    return (this: any);
  }

  chainR<L1, R1>(): Either<L | L1, R1> {
    return (this: any);
  }

  chainL<L1, R1>(transform: L => Either<L1, R1>): Either<L1, R | R1> {
    return transform(getLeft(this));
  }

  bichain<L1, R1>(transformL: L => Either<L1, R1>): Either<L1, R1> {
    return transformL(getLeft(this));
  }

  ap<L1, R1>(): Either<L | L1, R1> {
    return (this: Either<L | L1, any>);
  }

  apR<L1, R1>(): Either<L | L1, R1> {
    return (this: Either<L | L1, any>);
  }

  apL<L1, R1>(either: Either<(L) => L1, R1>): Either<L1, R | R1> {
    return either.mapL(transform => transform(getLeft(this)));
  }

  biap<L1, R1>(either: Either<(L) => L1, (R) => R1>): Either<L1, R1> {
    return (this.apL(either): Either<L1, any>);
  }

  alt<L1, R1>(either: Either<L1, R1>): Either<L1, R | R1> {
    return either;
  }

  or<L1, R1>(either: Either<L1, R1>): Either<L1, R | R1> {
    return either;
  }

  and<L1, R1>(): Either<L | L1, R1> {
    return (this: Either<L | L1, any>);
  }

  unwrap(): L {
    return getLeft(this);
  }

  getOr<R1>(value: R1): R1 {
    return value;
  }

  getOrElse<R1>(fn: L => R1): R1 {
    return fn(getLeft(this));
  }

  getLeftOr(): L {
    return getLeft(this);
  }

  getLeftOrElse(): L {
    return getLeft(this);
  }

  getRightOr<R1>(value: R1): R1 {
    return value;
  }

  getRightOrElse<R1>(fn: () => R1): R1 {
    return fn();
  }

  reduce<R1>(transform: (R1, R) => R1, or: R1): R1 {
    return or;
  }

  reduceR<R1>(transform: (R1, R) => R1, or: R1): R1 {
    return or;
  }

  reduceL<L1>(transform: (L1, L) => L1, or: L1): L1 {
    return transform(or, getLeft(this));
  }

  tap(): Either<L, R> {
    return this;
  }

  tapR(): Either<L, R> {
    return this;
  }

  tapL(call: L => any): Either<L, R> {
    call(getLeft(this));
    return this;
  }

  tapBoth(callL: L => mixed): Either<L, R> {
    return this.tapL(callL);
  }

  swap(): Either<R, L> {
    return new EitherRight(getLeft(this));
  }

  left(): maybe.Maybe<L> {
    return this.toMaybeL();
  }

  right(): maybe.Maybe<R> {
    return this.toMaybeR();
  }

  toMaybe(): maybe.Maybe<R> {
    return this.toMaybeR();
  }

  toMaybeR(): maybe.Maybe<R> {
    return maybe.nothing;
  }

  toMaybeL(): maybe.Maybe<L> {
    return maybe.Just(getLeft(this));
  }

  toMaybeLR(): maybe.Maybe<L | R> {
    return this.toMaybeL();
  }

  promise() {
    return Promise.reject(getLeft(this));
  }

  fold<T>(fromLeft: L => T): T {
    return fromLeft(getLeft(this));
  }
}

const [getRight, setRight]: [
  <L, R>(EitherRight<L, R>) => R,
  <L, R>(EitherRight<L, R>, R) => R,
] = getSet('right');

const [getLeft, setLeft]: [
  <L, R>(EitherLeft<L, R>) => L,
  <L, R>(EitherLeft<L, R>, L) => L,
] = getSet('left');

export const Right = <L, R>(right: R): Either<L, R> => new EitherRight(right);
export const Left = <L, R>(left: L): Either<L, R> => new EitherLeft(left);

export const ifElse = <L, R>(
  condition: boolean,
  right: R,
  left: L,
): Either<L, R> => (condition ? Right(right) : Left(left));
