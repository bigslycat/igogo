import test, { beforeEach } from 'ava';
import { Just, Nothing } from '../../src/Maybe';

beforeEach(t => {
  const value = 10;
  t.context.value = value;
  t.context.just = Just(value);
  t.context.predicate1 = x => x === value;
  t.context.predicate2 = x => x % 2 === 0;
  t.context.predicate3 = x => x !== value;
});

test('returns the filtered Just instance', t => {
  const value = 10;
  const just1 = Just(value);
  const just2 = Just(value);
  const predicate1 = x => x === value;
  const predicate2 = x => x % 2 === 0;
  const predicate3 = x => x !== value;

  t.is(
    just1.filter(x => predicate1(x) && predicate2(x)).getOr(),
    just1
      .filter(predicate1)
      .filter(predicate2)
      .getOr(),
  );
  t.is(just1.filter(() => true).getOr(), just1.getOr());
  t.is(just1.filter(predicate3).isNothing, just2.filter(predicate3).isNothing);
});

test('throws an error when there is no predicate', t => {
  const errorMessage = 'predicate is not a function';
  const error = arg =>
    t.throws(() => {
      const just = Just(10);
      just.filter(arg);
    }, TypeError);

  t.is(error(null).message, errorMessage);
  t.is(error(undefined).message, errorMessage);
  t.is(error(1).message, errorMessage);
  t.is(error('').message, errorMessage);
  t.is(error([]).message, errorMessage);
  t.is(error({}).message, errorMessage);
  t.is(error(true).message, errorMessage);
});

test('nothing to filter on the Nothing instance', t => {
  const nothing = Nothing();

  t.true(nothing.filter().isNothing);
  t.true(nothing.filter(x => x).isNothing);
});
