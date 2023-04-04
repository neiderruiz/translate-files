import {describe, expect, test} from '@jest/globals';
import { sortByLanguage } from '../src/utils/sort-by-language';

describe('sortByLanguage', () => {
  test('sorts JSON by language', () => {
    const input = [
      { key: 'hello', en: 'hello', es: 'hola' },
      { key: 'world', en: 'world', es: 'mundo' },
    ];
    const output = [
        { key: { hello: 'hello', world: 'world' } },
        { en: { hello: 'hello', world: 'world' } },
        { es: { hello: 'hola', world: 'mundo' } }
    ];
    expect(sortByLanguage(input)).toEqual(output);
  });
});
