export default class AtbashCipher {

  // This is executed only once as a static property of the class. The reason
  // for its existence is that it removes the need for checking character codes
  // or inclusion (O(n)) and substitution can be done unconditionally.
  //
  // character => subtitute (both directions are equal)
  //
  private static readonly SUBSTITUTION =
    [...'zyxwvutsrqponmlkjihgfedcba']
      .reduce((result, letter, index, cipher) => ({ ...result, [letter]: cipher[cipher.length - index - 1] }),
        // character => character (don't substitute numbers)
        [...'0123456789'].reduce((result, digit) => ({ ...result, [digit]: digit }), {}) as { [k: string]: string }
      )

  public encode(message: string): string {
    const encoded = [...this.substitute(message)]

    // Build groups of max 5 characters
    const groups = []
    while (encoded.length > 0) {
      groups.push(encoded.splice(0, 5).join(''))
    }

    return groups.join(' ')
  }

  public decode(message: string): string {
    return this.substitute(message)
  }

  private substitute(message: string): string {
    return [...message]
      .map(character => AtbashCipher.SUBSTITUTION[character.toLowerCase()])
      .filter(Boolean) // remove failed substitutions such as punctiation, space
      .join('')
  }
}
