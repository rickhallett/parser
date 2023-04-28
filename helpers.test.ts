import _ from "lodash";
import { shift, map, filter, isDigit, isLetter } from "./helpers";

describe("Helper functions", () => {
  describe("shift", () => {
    test("'' => undefined", () => {
      expect(shift("")).toBe(undefined);
    });

    test("'abc' => ['a','bc']", () => {
      expect(shift("abc")).toStrictEqual(["a", "bc"]);
    });
  });

  describe("map", () => {
    describe("parseInt", () => {
      test("'123' => [1,'23']", () => {
        expect(map(_.parseInt)(shift)("123")).toStrictEqual([1, "23"]);
      });
    });
  });

  describe("filter", () => {
    describe("parseInt", () => {
      test("'123' => ['1','23']", () => {
        expect(filter(_.parseInt)(shift)("123")).toStrictEqual(["1", "23"]);
      });

      test("'a23' => undefined", () => {
        expect(filter(_.parseInt)(shift)("a23")).toStrictEqual(undefined);
      });

      test("''' => undefined'", () => {
        expect(filter(_.parseInt)(shift)("")).toBe(undefined);
      });
    });

    describe("isDigit", () => {
      test("'123' => ['1','23']", () => {
        expect(filter(isDigit)(shift)("123")).toEqual(["1", "23"]);
      });

      test("'abc => undefined", () => {
        expect(filter(isDigit)(shift)("abc")).toEqual(undefined);
      });
    });

    describe("isLetter", () => {
      test("'abc' => ['a','bc']", () => {
        expect(filter(isLetter)(shift)("abc")).toEqual(["a", "bc"]);
      });

      test("'123' => undefined", () => {
        expect(filter(isLetter)(shift)("123")).toEqual(undefined);
      });
    });
  });
});
