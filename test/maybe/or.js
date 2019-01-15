import test from 'ava';
import { Just, Nothing } from '../../src/Maybe';

test('returns nothing on the Just instance', t => {
  const just1 = Just(10);
  const just2 = Just(20);

  t.true(just1.or().isNothing);
  t.true(just1.or(just2).isNothing);
});

test('returns argument on the Nothing instance', t => {
  const nothing = Nothing();
  const just = Just(10);

  t.true(nothing.or(just).isJust);
  t.is(nothing.or(just).getOr(), just.getOr());
});
