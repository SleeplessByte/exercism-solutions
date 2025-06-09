/* eslint-disable linebreak-style */
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const ALPHABET_LENGTH = ALPHABET.length;
const FIRST_CHAR_CODE = ALPHABET.charCodeAt(0);
const RANDOM_KEY_LENGTH = 100;
const VALID_KEY_PATTERN = /^[a-z]+$/;

export class Cipher {
  static generateRandomKey() {
    let concattedKey = '';
    for (let i = 0; i < RANDOM_KEY_LENGTH; i++) {
      concattedKey += Cipher.randomChar();
    }
    return concattedKey;
  }

  static randomChar() {
    return String.fromCharCode(
      Math.floor(Math.random() * ALPHABET_LENGTH) + FIRST_CHAR_CODE
    );
  }

  static validateKey(key) {
    if (VALID_KEY_PATTERN.test(key)) {
      return key;
    }

    throw new Error('Bad key');
  }

  constructor(key) {
    this.key = (key === undefined && Cipher.generateRandomKey()) || Cipher.validateKey(key);
    this.encode = this.process.bind(this, 1);
    this.decode = this.process.bind(this, -1);
  }

  shiftBy(index) {
    return this.key.charCodeAt(index % this.key.length) - FIRST_CHAR_CODE;
  }

  process(direction, input) {
    const outputLength = input.length;
    let output = '';
    for (let i = 0; i < outputLength; i++) {
      output += String.fromCharCode(this.shiftCharCode(input.charCodeAt(i), direction, i));
    }
    return output;
  }

  shiftCharCode(charCode, direction, index) {
    const shiftValue = direction * this.shiftBy(index);
    return ((charCode - FIRST_CHAR_CODE + shiftValue + ALPHABET_LENGTH) % ALPHABET_LENGTH)
      + FIRST_CHAR_CODE;
  }
}
