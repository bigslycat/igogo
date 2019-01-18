import test from 'ava';
import { Just, Nothing } from '../../src/Maybe';

test('returns nothing on the Just instance', t => {
  const just1 = Just(10);
  const just2 = Just(20);

  t.is(just1.or().getOr('DEFAULT 1'), just1.getOr('DEFAULT 2'));
  t.is(just1.or(just2).getOr('DEFAULT 1'), just1.getOr('DEFAULT 2'));
});

test('returns argument on the Nothing instance', t => {
  const nothing = Nothing();
  const just = Just(10);

  t.true(nothing.or(just).isJust);
  t.is(nothing.or(just).getOr('DEFAULT 1'), just.getOr('DEFAULT 2'));
});
