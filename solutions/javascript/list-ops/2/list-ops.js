/* eslint-disable no-use-before-define */

const Null = {
  get value() {
    return undefined
  },

  get next() {
    return this
  },

  get values() {
    return []
  },

  get() {
    return this.value
  },

  push(item) {
    return new Cons(item, this)
  },

  length() {
    return 0
  },

  append(other) {
    return other
  },

  concat() {
    return this
  },

  forEach() {
    /* done */
  },

  foldl(_, initial) {
    return initial
  },

  foldr(_, initial) {
    return initial
  },

  filter() {
    return Null
  },

  reverse() {
    return this
  },

  map() {
    return this
  },
}

class Cons {
  constructor(value, next = Null) {
    this.value = value
    this.next = next
  }

  get values() {
    return [this.value, ...this.next.values]
  }

  get(i) {
    return i === 0
      ? this.value
      : this.next.get(i - 1)
  }

  push(item) {
    this.next = this.next.push(item)
    return this
  }

  length() {
    return 1 + this.next.length()
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
    callback(this.value)
    this.next.forEach(callback)
  }

  foldl(callback, initial) {
    let result = initial

    this.forEach((item, i) => {
      result = callback(result, item, i)
    })

    return result
  }

  foldr(callback, initial) {
    return this.reverse().foldl(callback, initial)
  }

  filter(predicate) {
    return this.foldl(
      (result, item) => (predicate(item) && result.push(item)) || result,
      Null,
    )
  }

  map(expression) {
    return this.foldl(
      (result, item) => result.push(expression(item)),
      Null,
    )
  }

  reverse() {
    return this.next.reverse().push(this.value)
  }

  static fromArray([head, ...tail]) {
    if (head === undefined) {
      return Null
    }

    return new Cons(head, Cons.fromArray(tail || []))
  }
}

export default class List {
  constructor(values = []) {
    return Cons.fromArray(values)
  }
}
