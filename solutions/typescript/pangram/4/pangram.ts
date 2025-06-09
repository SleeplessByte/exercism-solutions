const ALPHABET = [...'qwertyuiopasdfghjklzxcvbnm']

export function isPangram(input: string): boolean {
  const normalised = input.toLowerCase()
  return ALPHABET.every((letter) => normalised.includes(letter))
}
