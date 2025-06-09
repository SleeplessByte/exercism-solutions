/* eslint-disable linebreak-style */
const ALPHABET_SHIFT = 'a'.charCodeAt(0) + 13;
const CIPHER_SHIFT = 'z'.charCodeAt(0) - 13;

const NUMBER_RANGE_START = '0'.charCodeAt(0) - ALPHABET_SHIFT;
const NUMBER_RANGE_END = '9'.charCodeAt(0) - ALPHABET_SHIFT;

/* Based on these offsets:

-    +
a 13 z
b 12 y
c 11 x
d 10 w
e 9 v
f 8 u
g 7 t
h 6 s
i 5 r
j 4 q
k 3 p
l 2 o
m 1 n

*/

function filterInput(character) {
  return /[a-z0-9]/.test(character);
}

function encodeCharacter(character) {
  const alphabetValue = character.charCodeAt(0) - ALPHABET_SHIFT;
  if (alphabetValue >= NUMBER_RANGE_START && alphabetValue <= NUMBER_RANGE_END) {
    return character;
  }

  // Mirror the current value using a mirror between m (-1) and n (1)
  const cipherValue = CIPHER_SHIFT + -1 * alphabetValue;
  return String.fromCharCode(cipherValue);
}

function chunk(input, size = 5) {
  const result = [];
  while (input.length) {
    result.push(input.splice(0, size).join(''));
  }
  return result;
}

export function encode(input) {
  const encodedArray = input.toLowerCase()
    .split('')
    .filter(filterInput)
    .map(encodeCharacter);
  return chunk(encodedArray).join(' ');
}
