import _ from "lodash";

/**
 * PARSERS
 */

// splits into parts for the next operation
export const shift = (input: string): [string, string] | undefined => {
  // base (bottom ladder)
  if (!input.length) {
    return undefined;
  }

  return [input[0], input.substring(1)];
};

/**
 * TRANSLATORS
 */

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

/**
 * FILTERS
 */

export const filter =
  (predicate: Function) => (parser: Function) => (input: string) => {
    const output = parser(input);

    if (output === undefined) {
      return undefined;
    }

    const [head, tail] = output;

    if (predicate(head)) {
      return [head, tail];
    } else {
      return undefined;
    }
  };

export const isDigit = (input: string): boolean => input >= "0" && input <= "9";

export const isLetter = (input: string): boolean => /^[a-zA-Z]$/.test(input);
