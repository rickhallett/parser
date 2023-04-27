const {shift, map, filter} = require('./helpers');

describe('Helper functions', () => {
  test('shift: empty string', () => {
    expect(shift('')).toBe(undefined);
  })

  test('shift: non-empty string', () => {
    expect(shift('abc')).toEqual(['a','bc'])
  })

  test('map: parseInt', () => {
    expect(map(parseInt)(shift)('123')).toBe([1,'23']);
  })

  test('filter: parseInt', () => {
    expect(filter(parseInt)(shift)('123')).toBe(['1','23']);
  })

  test('filter: parseInt', () => {
    expect((parseInt)(shift)('a23')).toBe(['23'])
  })

  test('filter: parseInt', () => {
    expect(filter(parseInt)(shift)('')).toBe(undefined)
  })
});