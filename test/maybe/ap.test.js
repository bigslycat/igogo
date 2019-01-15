import test from 'ava';
import { Just, Nothing } from '../../src/Maybe';

test('applies Just instance to another instance', t => {
  const value = 10;
  const transform1 = x => x + x;
  const transform2 = x => x * x;
  const just1 = Just(value);
  const just2 = Just(transform1);
  const just3 = Just(transform2);

  t.is(just1.ap(just2).getOr(), transform1(value));
  t.is(
    just1
      .ap(
        just2.ap(
          just3.map(_transform2 => _transform1 => _value =>
            _transform2(_transform1(_value)),
          ),
        ),
      )
      .getOr(),
    just1
      .ap(just2)
      .ap(just3)
      .getOr(),
  );
});

test('throws an error when transform is not a function', t => {
  const errorMessage = "Cannot read property 'map' of undefined";
  const error = arg =>
    t.throws(() => {
      const just = Just(arg);
      just.ap();
    }, TypeError);

  t.is(error(null).message, errorMessage);
  t.is(error(undefined).message, errorMessage);
  t.is(error(1).message, errorMessage);
  t.is(error('').message, errorMessage);
  t.is(error([]).message, errorMessage);
  t.is(error({}).message, errorMessage);
  t.is(error(true).message, errorMessage);
});

test('applies nothing on the Nonthing instance', t => {
  const nothing = Nothing();

  t.true(nothing.ap().isNothing);
});
