import _ from "lodash";
import { shift, map, filter } from "./helpers";

describe("Helper functions", () => {
  test("shift: empty string", () => {
    expect(shift("")).toBe(undefined);
  });

  test("shift: non-empty string", () => {
    expect(shift("abc")).toStrictEqual(["a", "bc"]);
  });

  test("map: _.parseInt", () => {
    expect(map(_.parseInt)(shift)("123")).toStrictEqual([1, "23"]);
  });

  test("filter: _.parseInt", () => {
    expect(filter(_.parseInt)(shift)("123")).toStrictEqual(["1", "23"]);
  });

  test("filter: _.parseInt", () => {
    expect(filter(_.parseInt)(shift)("a23")).toStrictEqual(["23"]);
  });

  test("filter: _.parseInt", () => {
    expect(filter(_.parseInt)(shift)("")).toBe(undefined);
  });
});
