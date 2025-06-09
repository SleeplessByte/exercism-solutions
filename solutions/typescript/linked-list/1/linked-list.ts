interface NodeParams<T> {
  value: Readonly<T>
  next?: Readonly<Node<T>>
  prev?: Readonly<Node<T>>
}

class Node<T> {
  public readonly value: T
  public next: Node<T> | undefined
  public prev: Node<T> | undefined

  constructor({ value, next, prev }: NodeParams<T>) {
    this.value = value
    this.next = next
    this.prev = prev
  }
}

export default class LinkedList<T> {
  private head: Node<T> | undefined
  private tail: Node<T> | undefined

  constructor() {
    this.head = undefined
    this.tail = undefined
  }

  clear(): LinkedList<T> {
    this.head = undefined
    this.tail = undefined
    return this
  }

  push(value: T): LinkedList<T> {
    const element = new Node({ value, next: this.head })

    if (this.head) {
      this.head.prev = element
    } else {
      this.tail = element
    }

    this.head = element
    return this
  }

  unshift(value: T): LinkedList<T> {
    const element = new Node({ value, prev: this.tail })

    if (this.tail) {
      this.tail.next = element
    } else {
      this.head = element
    }

    this.tail = element
    return this
  }

  pop(): T {
    if (!this.head) {
      throw new Error('list is empty')
    }

    const { value } = this.head

    if (this.head.next) {
      this.head = this.head.next
      this.head.prev = undefined
    } else {
      this.clear()
    }

    return value
  }

  shift(): T {
    if (!this.tail) {
      throw new Error('list is empty')
    }

    const { value } = this.tail

    if (this.tail.prev) {
      this.tail = this.tail.prev
      this.tail.next = undefined
    } else {
      this.clear()
    }

    return value
  }

  count(): number {
    let count = 0
    let element = this.head

    while (element) {
      count += 1
      element = element.next
    }

    return count
  }

  delete(value: T): LinkedList<T> {
    let element = this.head
    while (element) {
      if (element.value !== value) {
        element = element.next
        continue
      }

      if (element.next) {
        element.next.prev = element.prev
      } else {
        this.tail = this.tail!!.prev
      }

      if (element.prev) {
        element.prev.next = element.next
      } else {
        this.head = this.head!!.next
      }

      break
    }

    return this
  }
}
