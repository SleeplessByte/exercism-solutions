/* eslint-disable no-continue */
// @ts-check

export class ArgumentError extends Error {}

class Token {
  /**
   * @return {number}
   */
  // eslint-disable-next-line class-methods-use-this
  call() {
    throw new Error('Not implemented')
  }
}

class Literal extends Token {
  /**
   * Creates an instance of Literal.
   * @param {string} value
   * @memberof Literal
   */
  constructor(value) {
    super()
    this.value = value
  }

  call() {
    return Number.parseFloat(this.value)
  }
}

class Operator extends Token {
  /**
   *
   *
   * @param {Context} context
   * @memberof Operator
   * @returns {number}
   */
  // @ts-ignore
  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  call(context) {
    throw new Error('Not implemented')
  }
}

class UnaryOperator extends Operator {
  /**
   *Creates an instance of UnaryOperator.
   * @param {(val: () => number) => number} action
   * @memberof UnaryOperator
   */
  constructor(action) {
    super()
    this.action = action
  }

  /**
   * Executes the operator
   *
   * @param {Context} context
   * @memberof BinaryOperator
   */
  // @ts-ignore
  call(context) {
    return this.action(context.value)
  }
}

class BinaryOperator extends Operator {
  /**
   * Creates an instance of BinaryOperator.
   * @param {(left: () => number, right: () => number) => number} action
   * @memberof BinaryOperator
   */
  constructor(action) {
    super()
    this.action = action
  }

  /**
   * Executes the operator
   *
   * @param {any} context
   * @memberof BinaryOperator
   */
  // @ts-ignore
  call(context) {
    return this.action(context.value, context.next)
  }
}

class Context {
  /**
   * Creates an instance of Context.
   * @memberof Context
   */
  constructor([initial, ...numbers]) {
    this.numbers = numbers
    this.result = initial.call()

    this.value = this.value.bind(this)
    this.next = this.next.bind(this)
  }

  value() {
    const result = this.result

    if (typeof result === "undefined") {
      throw new Error("Syntax error");
    }

    return result
  }

  next() {
    const fn = this.numbers.shift()
    
    if (typeof fn === "undefined") {
      throw new Error("Syntax error");
    }

    const result = fn.call();

    if (typeof result === "undefined") {
      throw new Error("Syntax error");
    }
    
    return result;
  }

  /**
   *
   *
   * @param {Operator} token
   * @memberof Context
   */
  call(token) {
    this.result = token.call(this)
  }
}

function escapeRegExp(s) {
  return s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
}

const PREFIXES = ['What is']
const POSTFIXES = ['?']

const OPERATORS = {
  // cubed: new UnaryOperator(a => a() ** 2),
  plus: new BinaryOperator((a, b) => a() + b()),
  minus: new BinaryOperator((a, b) => a() - b()),
  'divided by': new BinaryOperator((a, b) => a() / b()),
  'multiplied by': new BinaryOperator((a, b) => a() * b()),
}

const PREFIX_RE = PREFIXES.map(escapeRegExp).join('|')
const POSTFIX_RE = POSTFIXES.map(escapeRegExp).join('|')
const NUMBER_LITERAL_RE = '-?\\d+\\.?\\d*'
const OPERATOR_PATTERN_RE = Object.keys(OPERATORS).map(escapeRegExp).join('|')

const NUMBER_LITERAL_PATTERN = new RegExp(`^(${NUMBER_LITERAL_RE})`)
const OPERATOR_PATTERN = new RegExp(`^(${OPERATOR_PATTERN_RE})`)
const VALID_PATTERN = new RegExp(`^(?:${PREFIX_RE})\\s*(?:(?:(?:${NUMBER_LITERAL_RE})|(?:${OPERATOR_PATTERN_RE}))\\s*)+(?:${NUMBER_LITERAL_RE})?(?:${POSTFIX_RE})$`)

function isPostFix(remainder) {
  return POSTFIXES.some(postfix => remainder.indexOf(postfix) === 0)
}

export function answer(question) {
  if (!VALID_PATTERN.test(question)) {
    // I don't believe in that the message here matters that much so I didn't
    // want to write more code for error checking. The syntax is either valid or
    // not.
    const message = question === 'What is?' ? 'Syntax error' : "Unknown operation"
    throw new ArgumentError(message)
  }

  let remainder = question.substring(
    PREFIXES.find(prefix => question.indexOf(prefix) === 0).length,
  ).trimLeft()

  const tokens = []

  // eslint-disable-next-line no-constant-condition
  while (remainder.length > 0) {
    if (isPostFix(remainder)) {
      break
    }

    const literalMatch = remainder.match(NUMBER_LITERAL_PATTERN)
    if (literalMatch) {
      const value = literalMatch[0]
      tokens.push(new Literal(value))
      remainder = remainder.substring(value.length).trimLeft()
      continue
    }

    const operatorMatch = remainder.match(OPERATOR_PATTERN)
    if (operatorMatch) {
      const value = operatorMatch[0]
      tokens.push(OPERATORS[value])
      remainder = remainder.substring(value.length).trimLeft()
      continue
    }

    throw new ArgumentError(`Did not match ${remainder}`)
  }

  // Two numbers or two operands following each other
  if (tokens.find((token, index, self) => index > 0 && self[index - 1].constructor.name === self[index].constructor.name)) {
    throw new Error("Syntax error");
  }

  const context = new Context(tokens.filter(token => token instanceof Literal))

  tokens.filter(token => (token instanceof Operator)).forEach((token) => {
    context.call(token);
  })

  // Left-over numbers
  if (context.numbers.length > 0) {
    throw new Error("Syntax error");
  }

  console.log(context);
  
  return context.value()
}
