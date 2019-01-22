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
  t.is(just1.alt(just2).getOr('DEFAULT 1'), just1.getOr('DEFAULT 2'));
});

test('returns value of the same alt on the Nothing instance', t => {
  const nothing1 = Nothing();
  const nothing2 = Nothing();
  const just = Just(10);

  t.is(nothing1.alt(just).getOr(), just.getOr());
  t.true(nothing1.alt(nothing2).isNothing);
});
