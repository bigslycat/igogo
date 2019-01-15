import test from 'ava';
import { Just, Nothing } from '../../src/Maybe';

test('returns argument', t => {
  const just1 = Just(10);
  const just2 = Just(20);

  t.is(just1.and(just2).getOr(), just2.getOr());
  t.is(just1.and(), undefined);
});

test('returns nothing on Nothing instance', t => {
  const nothing = Nothing();
  const just = Just(10);

  t.true(nothing.and(just).isNothing);
  t.true(nothing.and().isNothing);
});
