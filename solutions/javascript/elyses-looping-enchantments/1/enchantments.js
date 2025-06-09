// @ts-check

/**
 * Determine how many cards of a certain type there are in the deck
 *
 * @param {number[]} stack
 * @param {number} card
 *
 * @returns {number} number of cards of a single type there are in the deck
 */
export function cardTypeCheck(stack, card) {
  let count = 0

  stack.forEach((needle) => {
    count += needle === card ? 1 : 0
  })

  return count

  // When not using forEach we could:
  // return stack.filter((needle) => needle === card).length
  //
  // Or:
  // return stack.reduce((count, needle) => needle === card ? count + 1 : count, 0)
}

/**
 * Determine how many cards are odd or even
 *
 * @param {number[]} stack
 * @param {boolean} type the type of value to check for - odd or even
 * @returns {number} number of cards that are either odd or even (depending on `type`)
 */
export function determineOddEvenCards(stack, type) {
  const rest = type ? 0 : 1
  
  let count = 0
  
  for (const card of stack) {
    if (card % 2 === rest) {
      count += 1
    }
  }

  return count

  // When not using for of we could:
  // return stack.filter((needle) => needle % 2 === rest).length
  //
  // Or:
  // return stack.reduce((count, needle) => needle % 2 === rest ? count + 1 : count, 0)
}
