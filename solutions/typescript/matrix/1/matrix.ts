/**
 * Transpose an array
 *
 * @param {Readonly<T[][]>} rows
 * @returns T[][]
 */
function transpose<T>(rows: T[][]): T[][] {
  return rows[0].map((_, i) => {
    return rows.map((row) => {
        return row[i]
    })
  })
}

class Matrix {

  public readonly rows: number[][]
  public readonly columns: number[][]

  constructor(input: Readonly<string>) {
    this.rows = input.split('\n').map((row) => row.split(' ').map(Number))
    this.columns = transpose(this.rows)
  }
}

export default Matrix
