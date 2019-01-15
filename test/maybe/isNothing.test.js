/* @flow */
import test from 'ava';
import { Just, Nothing } from '../../src/Maybe';

test('returns false on the Just instance', t => {
  const j = Just(10);

  t.false(j.isNothing);
});

test('returns false on the Nothing instance', t => {
  const n = Nothing();

  t.true(n.isNothing);
});
