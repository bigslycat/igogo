import test from 'ava';
import { Just, Nothing } from '../../src/Maybe';

test('returns value of the same Alt on the Just instance', t => {
  const just1 = Just(10);
  const just2 = Just(20);
  const just3 = Just(30);
  const transform = x => x + x;

  t.is(just1.alt(just2).alt(just3), just1.alt(just2.alt(just3)));
  t.is(
    just1
      .alt(just2)
      .map(transform)
      .getOr(),
    just1
      .map(transform)
      .alt(just2.map(transform))
      .getOr(),
  );
});

test('returns value of the same alt on the Nothing instance', t => {
  const nothing = Nothing();
  const just = Just(10);

  t.is(nothing.alt(just).isJust, just.isJust);
  t.is(nothing.alt(just).getOr(), just.getOr());
});
