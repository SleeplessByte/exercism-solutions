/* eslint-disable linebreak-style */
export default class Crypto {
  constructor(input) {
    this.input = input.toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  normalizePlaintext() {
    return this.input;
  }

  size() {
    return Math.ceil(Math.sqrt(this.input.length))
  }

  plaintextSegments() {
    return this.input.match(new RegExp(`(.{1,${this.size()}})`, 'g'));
  }

  ciphertext() {
    const columns = this.size();
    const segments = this.plaintextSegments();
    const rows = segments.length;

    let result = '';
    for (let j = 0; j < columns; j++) {
      for (let i = 0; i < rows; i++) {
        result += segments[i][j] || '';
      }
    }

    return result;
  }
}
