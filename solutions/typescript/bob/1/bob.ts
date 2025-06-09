const isSilence = (message: string) => /^\s*$/.test(message)
const isShouting = (message: string) => /^[^A-Za-z]*[A-Z]+(?:[^a-z]*)$/.test(message)
const isAsking = (message: string) => /\?\s*$/.test(message)

export const hey = (message: string): string => {
  if (isSilence(message)) {
    return 'Fine. Be that way!'
  }

  if (isShouting(message)) {
    return isAsking(message)
      ? "Calm down, I know what I'm doing!"
      : 'Whoa, chill out!'
  }

  return isAsking(message)
    ? 'Sure.'
    : 'Whatever.'
}
