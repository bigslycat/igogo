import test, { beforeEach } from 'ava';
import { Just, Nothing } from '../../src/Maybe';

beforeEach(t => {
  const value = 10;
  t.context.value = value;
  t.context.just = Just(value);
  t.context.sideEffect = x => x;
});

test('calls side-effect in the Just instance', t => {
  const { just, value, sideEffect } = t.context;

  t.is(just.tap(sideEffect).getOr(), value);
});

test('throws an error when side-effect is not a function', t => {
  const { just } = t.context;
  const errorMessage = 'call is not a function';
  const error = t.throws(() => {
    just.tap();
  });

  t.is(error.message, errorMessage);
});

test('calls nothing in the Nothing instance', t => {
  const nothing = Nothing();
  const { sideEffect } = t.context;

  t.true(nothing.tap(sideEffect).isNothing);
});
