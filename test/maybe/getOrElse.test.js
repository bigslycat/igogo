import test from 'ava';
import { Just, Nothing } from '../../src/Maybe';

test('returns value on the Just instance', t => {
  const value = 10;
  const just = Just(value);

  t.is(just.getOrElse(), value);
  t.is(just.getOrElse(value + value), value);
});

test('calls function on the Nothing instance', t => {
  const nothing = Nothing();
  const defaultValue = 10;
  const fn = () => defaultValue;

  t.is(nothing.getOrElse(fn), defaultValue);
});

test('throws an error on the Nothing instance if there is no function', t => {
  const nothing = Nothing();
  const errorMessage = 'fn is not a function';
  const error = t.throws(() => {
    nothing.getOrElse();
  }, TypeError);

  t.is(error.message, errorMessage);
});
