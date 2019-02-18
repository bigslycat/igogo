export declare interface Maybe<T> {
  readonly isJust: boolean;
  readonly isNothing: boolean;

  map<T1>(transform: (value: T) => T1): Maybe<T1>;
  mapTo<T1>(value: T1): Maybe<T1>;
  ap<T1>(maybe: Maybe<(value: T) => T1>): Maybe<T1>;
  chain<T1>(transform: (value: T) => Maybe<T1>): Maybe<T1>;

  filter(predicate: (value: T) => boolean): Maybe<T>;
  filter(predicate: typeof Boolean, value: T): Maybe<NonNullable<T>>;
  filter<T1 extends T>(
    predicate: (value: T) => value is T1,
    value: T,
  ): Maybe<T1>;

  tap(call: (value: T) => any): Maybe<T>;

  and<T1>(maybe: Maybe<T1>): Maybe<T1>;
  or<T1>(maybe: Maybe<T1>): Maybe<T | T1>;
  alt<T1>(maybe: Maybe<T1>): Maybe<T | T1>;

  getOr(value: T): T;
  getOrElse(fn: () => T): T;
  reduce<T1>(transform: (acc: T1, value: T) => T1, or: T1): T1;

  toEither<L>(left: L): Either<L, T>;

  promise(error?: Error): Promise<T>;
}

export declare interface Either<L, R> {
  readonly isRight: boolean;
  readonly isLeft: boolean;

  map<R1>(transform: (right: R) => R1): Either<L, R1>;
  mapR<R1>(transform: (right: R) => R1): Either<L, R1>;
  mapL<L1>(transform: (left: L) => L1): Either<L1, R>;
  bimap<L1, R1>(
    transformL: (left: L) => L1,
    transformR: (right: R) => R1,
  ): Either<L1, R1>;

  mapTo<R1>(right: R1): Either<L, R1>;
  mapRTo<R1>(right: R1): Either<L, R1>;
  mapLTo<L1>(left: L1): Either<L1, R>;
  bimapTo<L1, R1>(left: L1, right: R1): Either<L1, R1>;

  chain<L1, R1>(transform: (right: R) => Either<L1, R1>): Either<L | L1, R1>;
  chainR<L1, R1>(transform: (right: R) => Either<L1, R1>): Either<L | L1, R1>;
  chainL<L1, R1>(transform: (left: L) => Either<L1, R1>): Either<L1, R | R1>;
  bichain<L1, R1>(
    transformL: (left: L) => Either<L1, R1>,
    transformR: (right: R) => Either<L1, R1>,
  ): Either<L1, R1>;

  ap<L1, R1>(either: Either<L1, (right: R) => R1>): Either<L | L1, R1>;
  apR<L1, R1>(either: Either<L1, (right: R) => R1>): Either<L | L1, R1>;
  apL<L1, R1>(either: Either<(left: L) => L1, R1>): Either<L1, R | R1>;
  biap<L1, R1>(
    either: Either<(left: L) => L1, (right: R) => R1>,
  ): Either<L1, R1>;

  alt<L1, R1>(either: Either<L1, R1>): Either<L1, R | R1>;
  or<L1, R1>(either: Either<L1, R1>): Either<L1, R | R1>;
  and<L1, R1>(either: Either<L1, R1>): Either<L | L1, R1>;

  unwrap(): R | L;

  getOr(value: R): R;
  getOrElse(fn: (L) => R): R;

  getLeftOr(value: L): L;
  getLeftOrElse(fn: () => L): L;
  getRightOr(value: R): R;
  getRightOrElse(fn: () => R): R;

  reduce<R1>(transform: (acc: R1, right: R) => R1, or: R1): R1;
  reduceR<R1>(transform: (acc: R1, right: R) => R1, or: R1): R1;
  reduceL<L1>(transform: (acc: L1, left: L) => L1, or: L1): L1;

  tap(call: (right: R) => unknown): Either<L, R>;
  tapR(call: (right: R) => unknown): Either<L, R>;
  tapL(call: (left: L) => unknown): Either<L, R>;
  tapBoth(
    callL: (left: L) => unknown,
    callR: (right: R) => unknown,
  ): Either<L, R>;

  swap(): Either<R, L>;

  left(): Maybe<L>;
  right(): Maybe<R>;

  toMaybe(): Maybe<R>;
  toMaybeR(): Maybe<R>;
  toMaybeL(): Maybe<L>;
  toMaybeLR(): Maybe<L | R>;

  promise(): Promise<R>;

  fold<T>(fromLeft: (left: L) => T, fromRight: (right: R) => T): T;
}

export declare const nothing: Maybe<any>;

export declare function Just<T>(value: T): Maybe<T>;
export declare function Nothing<T>(value: T): Maybe<T>;
export declare function fromNullable<T>(value: null | void | T): Maybe<T>;
export declare function opt<T>(value: null | void | T): Maybe<T>;
export declare function when<V>(condition: boolean, value: V): Maybe<V>;
export declare function when<V>(
  predicate: (value: V) => boolean,
  value: V,
): Maybe<V>;
export declare function when<V>(
  predicate: typeof Boolean,
  value: V,
): Maybe<NonNullable<V>>;
export declare function when<V, T extends V>(
  predicate: (value: V) => value is T,
  value: V,
): Maybe<T>;
export declare function Right<L, R>(right: R): Either<L, R>;
export declare function Left<L, R>(left: L): Either<L, R>;
export declare function ifElse<L, R>(
  condition: boolean,
  right: R,
  left: L,
): Either<L, R>;
