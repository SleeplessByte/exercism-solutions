const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const ALPHABET_LENGTH = ALPHABET.length;
const FIRST_CHAR_CODE = ALPHABET.charCodeAt(0);
const RANDOM_KEY_LENGTH = 100;
const VALID_KEY_PATTERN = /^[a-z]+$/;

export class Cipher {
  static generateRandomKey() {
    return String.fromCharCode(
      ...Array.from(Array(RANDOM_KEY_LENGTH), () => Cipher.randomCharCode())
    )
  }

  static randomCharCode() {
    return Math.floor(Math.random() * ALPHABET_LENGTH) + FIRST_CHAR_CODE;
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
    return input
      .split('')
      .map((letter, index) => this.shiftLetter(letter, direction, index))
      .join('');
  }

  shiftLetter(letter, direction, index) {
    return String.fromCharCode(
      ((letter.charCodeAt(0) - FIRST_CHAR_CODE + direction * this.shiftBy(index) + ALPHABET_LENGTH) % ALPHABET_LENGTH)
        + FIRST_CHAR_CODE,
    );
  }
}
