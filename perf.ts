const isLetter = (input: string): boolean => {
  const code = input.charCodeAt(0);
  return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
};

const isLetterRegex = (input: string): boolean => /^[a-zA-Z]$/.test(input);


function performanceTest() {
  const testString = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  console.time('isLetter');
  for (let i = 0; i < 1_000_000; i++) {
    testString.split('').forEach((char) => isLetter(char));
  }
  console.timeEnd('isLetter');

  console.time('regex');
  for (let i = 0; i < 1_000_000; i++) {
    testString.split('').forEach((char) => isLetterRegex(char));
  }
  console.timeEnd('regex');
}

performanceTest();