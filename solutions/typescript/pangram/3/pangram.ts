const ALPHABET = [...'qwertyuiopasdfghjklzxcvbnm']

export default class Pangram {
  constructor(private readonly input: Readonly<string>) {}

  isPangram(): boolean {
    const normalised = this.input.toLowerCase()
    return ALPHABET.every((letter) => normalised.includes(letter))
  }
}
