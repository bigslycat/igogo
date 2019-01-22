import test from 'ava';
import { Just, Nothing } from '../../src/Maybe';

test('returns true on the Just instance', t => {
  const just = Just(10);

  t.true(just.isJust);
});

test('returns false on the Nothing instance', t => {
  const nothing = Nothing();

  t.false(nothing.isJust);
});
