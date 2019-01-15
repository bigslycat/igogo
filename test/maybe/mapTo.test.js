import test from 'ava';
import { Just, Nothing } from '../../src/Maybe';

test('sets value on Just instance', t => {
  const just = Just(10);
  const newValue = 20;

  t.is(just.mapTo(newValue).getOr(), newValue);
  t.is(just.mapTo().getOr(), undefined);
});

test('sets nothing on Nothing instance', t => {
  const nothing = Nothing();

  t.true(nothing.mapTo('something').isNothing);
});
