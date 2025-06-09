/* eslint-disable no-unused-vars */
//
// This is only a SKELETON file for the 'Bob' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

const isSilence = message => /^\s*$/.test(message)
const isShouting = message => message.toUpperCase() === message && /[A-Z]/.test(message)
const isAsking = message => /\?$/.test(message.trim())

// message.replace(/\s+/g, '') === ''
// message[message.length - 1] === '?'

export const hey = (message) => {
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
