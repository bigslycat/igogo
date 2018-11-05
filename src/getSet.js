/* @flow */

export const getSet = (keyName?: string) => {
  const key = Symbol(keyName);
  return [
    (instance: Object): any => instance[key],
    (instance: Object, value: any): any => (instance[key] = value),
  ];
};
