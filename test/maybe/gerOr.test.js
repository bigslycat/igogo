import test from 'ava';
import { Just, Nothing } from '../../src/Maybe';

test('returns value on the Just instance', t => {
  const value = 10;
  const just = Just(10);

  t.is(just.getOr(), value);
  t.is(just.getOr(value + value), value);
});

test('return arg on Nothing instance', t => {
  const defaultValue = 10;
  const nothing = Nothing();

  t.is(nothing.getOr(defaultValue), defaultValue);
  t.is(nothing.getOr(), undefined);
});
