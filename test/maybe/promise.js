import test from 'ava';
import { Just, Nothing } from '../../src/Maybe';

test('returns resolved promise on the Just instance', t => {
  const value = 10;
  const just = Just(value);

  return just.promise().then(result => {
    t.is(result, value);
  });
});

test('returns rejected promise on the Nothing instance', t => {
  const nothing = Nothing();
  const errValue = 'value';

  return nothing.promise(errValue).catch(err => {
    t.is(errValue, err);
  });
});
