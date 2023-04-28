import _ from "lodash";

// splits into parts for the next operation
// example of parser
export const shift = (input: string): [string, string] | undefined => {
  // base (bottom ladder)
  if (!input.length) {
    return undefined;
  }

  return [input[0], input.substring(1)];
};

// translate the output, unless undefined
// takes single function,
export const map =
  (mapper: Function) =>
  (parser: Function) =>
  (input: string): [string, string] | undefined => {
    const output = parser(input);
    if (output === undefined) {
      return undefined;
    }

    const [head, tail] = output;
    return [mapper(head), tail];
  };

export const filter =
  (predicate: Function) => (parser: Function) => (input: string) => {
    const output = parser(input);

    if (output === undefined) {
      return undefined;
    }

    const [head, tail] = output;

    if (predicate(head)) {
      return [head, tail];
    }

    return [tail];
  };
