const _ = require("lodash");

const test = (actual, expected, msg) => {
  console.assert(_.isEqual(actual, expected), `${msg}: actual: ${JSON.stringify(actual)}, expected: ${JSON.stringify(expected)}`);
}

// splits into parts for the next operation
// example of parser
const shift = (input) => {
  // base (bottom ladder)
  if (!input.length) {
    return undefined;
  }

  return [input[0], input.substring(1)];
}

test(shift(""), undefined, "shift: empty string");
test(shift("abc"), ["a", "bc"], "shift: non-empty string");

// translate the output, unless undefined
// takes single function,
const map = (mapper) => (parser) => (input) => {
  const output = parser(input);
      if (output === undefined) {
        return undefined;
      }
        

      const [head, tail] = output;
      return [mapper(head), tail];
}

test(
  map(Number.parseInt)(shift)("abc"),
  [NaN, "bc"],
  "map: parseInt"
);

test(map(Number.parseInt)(shift)('123'), [1,"23"], "map: parseInt");

const filter = (predicate) => (parser) => (input) => {
  const output = parser(input);
  let head, tail;

  try {
    [head, tail] = output;
  } catch(error) {
    return undefined;
  }

  if (predicate(head)) {
    return [head, tail]
  };

  return [tail];
}

test(filter(Number.parseInt)(shift)('123'), ['1','23'], "filter: parseInt");
test(filter(Number.parseInt)(shift)('a23'), ['23'], "filter: parseInt");
test(filter(Number.parseInt)(shift)(''), undefined, "filter: parseInt");

module.exports = {
  shift, map, filter
}




