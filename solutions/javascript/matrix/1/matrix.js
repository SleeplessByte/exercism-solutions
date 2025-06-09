// @ts-check

/**
 * Transpose an array
 *
 * @param {Readonly<any[][]>} rows
 * @returns any[][]
 */
function transpose(rows) {
  return rows[0].map((_, i) => {
    return rows.map((row) => {
        return row[i]
    })
  })
}

/**
 * In place transposing works but SHOULDN'T. The tests are bad:
 * @example
 *
 * function transpose(matrix) {
 *   for (let i = 0; i < matrix.length; i++) {
 *     for (let j = 0; j < i; j++) {
 *       [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
 *     }
 *   }
 *   return matrix
 */

export class Matrix {
  /**
   * Creates an instance of Matrix.
   * @param {string} input
   * @memberof Matrix
   */
  constructor(input) {
    this.data = input.split('\n').map((row) => row.split(' ').map(Number))
  }

  get rows() {
    return this.data
  }

  get columns() {
    return transpose(this.rows)
  }
}
