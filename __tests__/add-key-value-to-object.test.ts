import { addKeyValueToObject } from '../src/utils/add-key-value-to-object';

describe('addKeyValueToObject', () => {
  it('should add a value to an object with a given set of keys', () => {
    const obj = {};
    const keys = ['a', 'b', 'c'];
    const value = 'test';
    addKeyValueToObject(obj, keys, value);
    expect(obj).toEqual({ a: { b: { c: 'test' } } });
  });

  it('should overwrite existing values if the same keys are used', () => {
    const obj = { a: { b: { c: 'old' } } };
    const keys = ['a', 'b', 'c'];
    const value = 'new';
    addKeyValueToObject(obj, keys, value);
    expect(obj).toEqual({ a: { b: { c: 'new' } } });
  });

  it('should work with a single key', () => {
    const obj = {};
    const keys = ['a'];
    const value = 'test';
    addKeyValueToObject(obj, keys, value);
    expect(obj).toEqual({ a: 'test' });
  });
});
