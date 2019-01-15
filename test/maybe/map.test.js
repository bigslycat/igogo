import test from 'ava';
import { Just, Nothing } from '../../src/Maybe';

test.beforeEach(t => {
  const v = 10;
  t.context.just = Just(v);
  t.context.value = v;
});

test('returns tramsfromed Just instance', t => {
  const { just, value } = t.context;
  const transform1 = x => x + x;
  const transform2 = () => value + value;
  const id = x => x;

  t.is(just.map(transform1).getOr(), transform1(value));
  t.is(just.map(transform2).getOr(), transform2());
  t.is(just.map(transform1, transform2).getOr(), transform1(value));
  t.is(just.map(id).getOr(), just.getOr());
  t.is(
    just.map(x => transform1(transform2(x))).getOr(),
    just
      .map(transform2)
      .map(transform1)
      .getOr(),
  );
});

test('throws an error when transform is not a function', t => {
  const { just } = t.context;
  const errorMessage = 'transform is not a function';
  const error = arg =>
    t.throws(() => {
      just.map(arg);
    }, TypeError);

  t.is(error(null).message, errorMessage);
  t.is(error(undefined).message, errorMessage);
  t.is(error([]).message, errorMessage);
  t.is(error(1).message, errorMessage);
  t.is(error('string').message, errorMessage);
  t.is(error(true).message, errorMessage);
  t.is(error({}).message, errorMessage);
});

test('returns nothing on the Nonthing instance', t => {
  const nothing = Nothing();

  t.true(nothing.map(x => x).isNothing);
  t.true(nothing.map().isNothing);
});
