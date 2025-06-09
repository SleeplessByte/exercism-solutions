/* eslint-disable linebreak-style */
const ALPHABET_SHIFT = 'a'.charCodeAt(0) + 13;
const CIPHER_SHIFT = 'z'.charCodeAt(0) - 13;

const INVALID_CHARACTERS = /[\W_]/g;
const LETTER_CHARACHTERS = /[a-z]/g;
const FIVE_CHARACTERS_OR_END_OF_STRING = /(.{5})(?!$)/g;

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

Instead you can use 'z'.charCodeAt(0) + 'a'.charCodeAt(0) and subtract a letter from it,
but that wouldn't be fun, now would it?

*/

function encodeCharacter(character) {
  const alphabetValue = character.charCodeAt(0) - ALPHABET_SHIFT;
  // Mirror the current value using a mirror between m (-1) and n (1)
  // This is the same as taking 219 (z + a) and subtracting character.charCodeAt(0)
  const cipherValue = CIPHER_SHIFT + -1 * alphabetValue;
  return String.fromCharCode(cipherValue);
}

export function encode(input) {
  return input.toLowerCase()
    .replace(INVALID_CHARACTERS, '')
    .replace(LETTER_CHARACHTERS, encodeCharacter)
    .replace(FIVE_CHARACTERS_OR_END_OF_STRING, '$1 ');
}
