import test from 'ava';
import { Just, Nothing } from '../../src/Maybe';

test('returns Either right side on Just instance', t => {
  const value = 10;
  const just = Just(value);

  t.true(just.toEither().isRight);
  t.is(just.toEither().getRightOr(), value);
});

test('returns Either left side on Nothing instance', t => {
  const nothing = Nothing();
  const leftValue = 'nothing';

  t.true(nothing.toEither().isLeft);
  t.is(nothing.toEither(leftValue).getLeftOr(), leftValue);
});
