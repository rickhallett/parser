import _ from 'lodash';
import {
  shift,
  map,
  filter,
  isDigit,
  isLetter,
  letter,
  oneOrMore,
  digit,
  zeroOrMore,
  sequence,
} from './helpers';

describe('Helper functions', () => {
  describe('shift', () => {
    test("'' => undefined", () => {
      expect(shift('')).toBe(undefined);
    });

    test("'abc' => ['a','bc']", () => {
      expect(shift('abc')).toStrictEqual(['a', 'bc']);
    });
  });

  describe('map', () => {
    describe('parseInt', () => {
      test("'123' => [1,'23']", () => {
        expect(map(_.parseInt)(shift)('123')).toStrictEqual([1, '23']);
      });
    });
  });

  describe('filter', () => {
    describe('parseInt', () => {
      test("'123' => ['1','23']", () => {
        expect(filter(_.parseInt)(shift)('123')).toStrictEqual(['1', '23']);
      });

      test("'a23' => undefined", () => {
        expect(filter(_.parseInt)(shift)('a23')).toStrictEqual(undefined);
      });

      test("''' => undefined'", () => {
        expect(filter(_.parseInt)(shift)('')).toBe(undefined);
      });
    });

    describe('isDigit', () => {
      test("'123' => ['1','23']", () => {
        expect(filter(isDigit)(shift)('123')).toEqual(['1', '23']);
      });

      test("'abc => undefined", () => {
        expect(filter(isDigit)(shift)('abc')).toEqual(undefined);
      });
    });

    describe('isLetter', () => {
      test("'abc' => ['a','bc']", () => {
        expect(filter(isLetter)(shift)('abc')).toEqual(['a', 'bc']);
      });

      test("'123' => undefined", () => {
        expect(filter(isLetter)(shift)('123')).toEqual(undefined);
      });
    });

    describe('letter', () => {
      test("'abc' => ['a','bc']", () => {
        expect(letter('abc')).toEqual(['a', 'bc']);
      });

      test("'123' => undefined", () => {
        expect(letter('123')).toEqual(undefined);
      });
    });
  });

  describe('parser combinators', () => {
    describe('oneOrMore', () => {
      describe('shift', () => {
        test("'123' => [['1','2','3'],'']", () => {
          expect(oneOrMore(shift)('123')).toEqual([['1', '2', '3'], '']);
        });
      });

      describe('map', () => {
        test("'123' => [[1,2,3],'']", () => {
          expect(oneOrMore(map(_.parseInt)(shift))('123')).toEqual([
            [1, 2, 3],
            '',
          ]);
        });

        describe('map filter', () => {
          test("'123' => [['1','2','3'],'']", () => {
            expect(
              oneOrMore(map(Number.parseInt)(filter(isDigit)(shift)))('123'),
            ).toEqual([[1, 2, 3], '']);

            expect(oneOrMore(map(Number.parseInt)(digit))('123')).toEqual([
              [1, 2, 3],
              '',
            ]);

            expect(oneOrMore(map(Number.parseInt)(digit))('abc')).toEqual(
              undefined,
            );

            const noTransform = (el: any) => el;

            expect(oneOrMore(map(noTransform)(letter))('abc')).toEqual([
              ['a', 'b', 'c'],
              '',
            ]);
          });
        });
      });
    });
    describe('zeroOrMore', () => {
      describe('filter digit', () => {
        test("'abc' => [[], 'abc'", () => {
          expect(zeroOrMore(digit)('abc')).toEqual([[], 'abc']);
        });

        test("'123abc' => [['1','2','3'], 'abc'", () => {
          expect(zeroOrMore(digit)('123abc')).toEqual([['1', '2', '3'], 'abc']);
        });
      });

      describe('map parseInt filter digit', () => {
        test("'123abc' => [[1,2,3], 'abc'", () => {
          expect(zeroOrMore(map(Number.parseInt)(digit))('123abc')).toEqual([
            [1, 2, 3],
            'abc',
          ]);
        });
      });
    });

    describe('sequence', () => {
      test("sequence(digit, letter)('1a2') => [['1', 'a'], '2']", () => {
        expect(sequence(digit, letter)('1a2')).toEqual([['1', 'a'], '2']);
      });

      test("sequence(letter, digit)('1a2') => undefined", () => {
        expect(sequence(letter, digit)('1a2')).toEqual(undefined);
      });

      test("sequence(digit, letter, digit)('1a2') => [['1', 'a', '2'],''", () => {
        expect(sequence(digit, letter, digit)('1a2')).toEqual([
          ['1', 'a', '2'],
          '',
        ]);
      });

      test("sequence()('1a2') => undefined", () => {
        expect(sequence()('1a2')).toEqual(undefined);
      });
    });
  });
});
