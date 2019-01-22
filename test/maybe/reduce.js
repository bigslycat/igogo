import test, { beforeEach } from 'ava';
import { Just, Nothing } from '../../src/Maybe';

beforeEach(t => {
  t.context.initialValue = 10;
  t.context.binaryFunction = (x, y) => x + y;
});

test('returns fold on the Just instance', t => {
  const { initialValue, binaryFunction } = t.context;
  const just = Just(10);

  t.is(
    just.reduce(binaryFunction, initialValue),
    binaryFunction(just.getOr(), initialValue),
  );
});

test('return initial value on the Nothing instance', t => {
  const { initialValue, binaryFunction } = t.context;
  const nothing = Nothing();

  t.is(nothing.reduce(binaryFunction, initialValue), initialValue);
});
