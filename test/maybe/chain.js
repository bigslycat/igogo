import test from 'ava';
import { Just, Nothing } from '../../src/Maybe';

test('returns a value of the same chain', t => {
  const value = 10;
  const just = Just(value);
  const transform1 = x => Just(x);
  const transform2 = x => Just(x + x);

  t.is(just.chain(transform1).getOr(), transform1(value).getOr());
  t.is(
    just
      .chain(transform1)
      .chain(transform2)
      .getOr(),
    just.chain(x => transform1(x).chain(transform2)).getOr(),
  );
});

test('throws an error when transform is not a function', t => {
  const errorMessage = 'transform is not a function';
  const error = arg =>
    t.throws(
      () => {
        const just = Just(10);
        just.chain(arg);
      },
      { instanceOf: TypeError },
    );

  t.is(error(null).message, errorMessage);
  t.is(error(undefined).message, errorMessage);
  t.is(error(1).message, errorMessage);
  t.is(error('').message, errorMessage);
  t.is(error([]).message, errorMessage);
  t.is(error({}).message, errorMessage);
  t.is(error(true).message, errorMessage);
});

test('returns nothing on the Nothing instance', t => {
  const nothing = Nothing();

  t.true(nothing.chain(() => Just(10)).isNothing);
});
