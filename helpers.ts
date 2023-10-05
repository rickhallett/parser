import _ from 'lodash';

/**
 * PARSERS
 *
 * Parser: A function that takes an input string (or a stream) and returns some structured data along with the remainder of the string.
 */

// splits into parts for the next operation
export const shift = (input: string): [string, string] | undefined => {
  if (!input.length) {
    return undefined;
  }

  return [input[0], input.substring(1)];
};

/**
 * TRANSLATORS
 *
 * Translator: A higher-order function that takes a function and a parser and returns a new parser where the output of the original parser is transformed by the given function.
 */

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
 *
 * Filter: A higher-order function that takes a predicate and a parser and returns a new parser that only succeeds if the original parser's output satisfies the predicate.
 */

export const filter =
  (predicate: Function) =>
  (parser: Function) =>
  (input: string): [string, string] | undefined => {
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

export const isDigit = (input: string): boolean => input >= '0' && input <= '9';

export const isLetter = (input: string): boolean => {
  const code = input.charCodeAt(0);
  return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
};

export const letter = filter(isLetter)(shift);

export const digit = filter(isDigit)(shift);

/**
 * PARSER COMBINATORS
 *
 * A higher-order function that takes one or more parsers and returns a new parser that combines their behavior in some way. oneOrMore is a parser combinator because it takes a parser and returns a new parser that tries to apply the original parser one or more times.
 */

export const oneOrMore =
  (parser: Function) =>
  (input: string, acc: any[] = []): [any[], string] | undefined => {
    // Added an accumulator parameter
    const output = parser(input);

    if (output === undefined) {
      // If the parser fails, we check if we had at least one successful parse.
      if (acc.length > 0) {
        return [acc, input]; // Return accumulated results and remaining tail
      } else {
        return undefined; // No successful parse at all
      }
    }

    const [head, tail] = output; // Destructure the head and new tail
    return oneOrMore(parser)(tail, [...acc, head]); // Recursive call with updated tail and accumulator
  };

/**
 * zeroOrMore(parser): This should try to apply the parser zero or more times until it fails. It should return an array containing all the parsed elements.
 *
 * For zeroOrMore, think about how it's different and similar to oneOrMore. Could you implement it by reusing oneOrMore in some way?
 */

export const zeroOrMore =
  (parser: Function) =>
  (input: string, acc: any[] = []): [any[], string] | undefined => {
    const output = oneOrMore(parser)(input);

    if (output === undefined) {
      return [[], input];
    }

    return output;
  };

/**
 * sequence(parsers): This should take an array of parsers and apply them sequentially to the input. If any of the parsers fail, sequence should also fail. Otherwise, it should return an array containing the parsed elements in the order they were parsed.
 *
 * For sequence, you'll likely need to manage state between multiple parsers. Think about how you could achieve this in a functional way.
 */

/**
 * Once you've completed this challenge, you'll have a set of building blocks for a more complex parser, and you'll gain deeper insights into functional programming paradigms and how they can be applied in JavaScript/TypeScript.
 */
