
export default class List {
  constructor(values = []) {
    this.values = values
  }

  /**
   * Get the item at index i
   *
   * Helper function to limit direct calls to values. This exercise is meant to
   * implement everything without using built-in functions.
   *
   * @param {number} i index of the item
   * @return the item at index i
   */
  get(i) {
    return this.values[i]
  }

  /**
   * Push item to the end of values
   *
   * Helper function to limit direct calls to values. This exercise is meant to
   * implement everything without using built-in functions.
   *
   * @param item the item to add
   * @return self
   */
  push(item) {
    this.values.push(item)
    return this
  }

  /**
   * N
   *
   * Helper function to limit direct calls to values. This exercise is meant to
   * implement everything without using built-in functions.
   *
   * @param item the item to add
   * @return self
   */
  length() {
    return this.values.length
  }

  append(other) {
    other.forEach(item => this.push(item))
    return this
  }

  concat(others) {
    others.forEach(other => this.append(other))
    return this
  }

  forEach(callback) {
    const l = this.length()
    for (let i = 0; i < l; i += 1) {
      callback(this.get(i), i)
    }
  }

  foldl(callback, initial) {
    let result = initial

    this.forEach((item, i) => {
      result = callback(result, item, i)
    })

    return result
  }

  foldr(callback, initial) {
    let result = initial

    const l = this.length()
    this.forEach((_, i) => {
      result = callback(result, this.get(l - i - 1), i)
    })

    return result
  }

  filter(expression) {
    return this.foldl(
      (result, item) => (expression(item) && result.push(item)) || result,
      new List(),
    )
  }

  map(expression) {
    return this.foldl(
      (result, item) => result.push(expression(item)),
      new List(),
    )
  }

  reverse() {
    return this.foldr(
      (result, item) => result.push(item),
      new List(),
    )
  }
}
