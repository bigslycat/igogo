/* @flow */
import anyTest, { type TestInterface } from 'ava';
import { Just, type Maybe } from '../src/Maybe';

type ContextData = {
  just: Maybe<10>,
  value: 10,
  transform: number => string,
};

const test: TestInterface<ContextData> = (anyTest: any);

test.beforeEach(t => {
  const v = 10;
  t.context.just = Just(v);
  t.context.value = v;
  t.context.transform = val => val.toString();
});

test('should check if `isJust` property is true in the instance of Just', t => {
  t.true(t.context.just.isJust);
});

test('should check if `isNothing` property is false in the instance of Just', t => {
  t.false(t.context.just.isNothing);
});

test('should check if `map` transform to another value based on previous value of Just', t => {
  const actual = t.context.just.map(t.context.transform).getOr();
  const expected = t.context.transform(t.context.value);
  t.is(actual, expected);
});

test('should check if `mapTo` transform to another value', t => {
  const newValue = 20;
  const actual = t.context.just.mapTo(newValue).getOr();
  t.is(actual, newValue);
});

test('should check if `ap` apply another maybe with current value', t => {
  const just2 = Just(t.context.transform);
  const actual = t.context.just.ap(just2).getOr();
  const expected = t.context.transform(t.context.value);

  t.is(actual, expected);
});

test('should check if `chain` transform current value', t => {
  const transformToMaybe = value => Just(value);
  const actual = t.context.just.chain(transformToMaybe).getOr();
  const expected = transformToMaybe(t.context.value).getOr();

  t.is(actual, expected);
});

test('should check if `filter` return Just if predicate is true', t => {
  const truePredicate = v => v % 2 === 0;
  // $FlowFixMe
  const actual = t.context.just.filter(truePredicate).isJust;
  const expected = truePredicate(t.context.value);

  t.is(actual, expected);
});

test('should check if `filter` return Nothing if predicate is false', t => {
  const falsePredicate = v => v % 2 !== 0;
  // $FlowFixMe
  const actual = t.context.just.filter(falsePredicate).isJust;
  const expected = falsePredicate(t.context.value);

  t.is(actual, expected);
});

test('should check if `tap` calls side effect', t => {
  const actual = t.context.just.tap(x => x).getOr();
  const expected = t.context.just.getOr();

  t.is(actual, expected);
});

test('should check if `and` incoming maybe', t => {
  const just2 = Just(20);
  const actual = t.context.just.and(just2).getOr();
  const expected = just2.getOr();

  t.is(actual, expected);
});

test('should check if `or` return nothing', t => {
  const actual = t.context.just.or(Just()).isNothing;

  t.true(actual);
});

test('should check if `alt` return value of the same Alt', t => {
  const actual = t.context.just.alt(t.context.just).getOr();
  const expected = t.context.just.getOr();

  t.is(actual, expected);
});

test('should check if `getOr` return current value', t => {
  const actual = t.context.just.getOr();
  const expected = t.context.value;

  t.is(actual, expected);
});

test('should check if `getOrElse` return current value', t => {
  const actual = t.context.just.getOr();
  const expected = t.context.value;

  t.is(actual, expected);
});

test('should check if `reduce` fold current value', t => {
  const initial = 10;
  const add = (x, y) => x + y;
  const actual = t.context.just.reduce(add, initial);
  const expected = add(t.context.value, initial);

  t.is(actual, expected);
});

test('should check if `toEither` return `right` value of the instance of Either', t => {
  const { isRight } = t.context.just.toEither();

  t.true(isRight);
});

test('should check if `promise` return resolved value', t =>
  t.context.just.promise().then(result => {
    t.is(result, t.context.value);
  }));
