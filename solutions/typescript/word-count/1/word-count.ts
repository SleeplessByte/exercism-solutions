const WORD_CAPTURE = /([^\s]+)(?:\s*|$)/g
export default class Words {
  count(input: string) {
    const counts = new Map<string, number>()
    let match
    while(match = WORD_CAPTURE.exec(input)) {
      const word = match[1].toLocaleLowerCase()
      counts.set(word, (counts.get(word) || 0) + 1)
    }
    return counts
  }
}
