export default class Triangle {

  public readonly rows: number[][]

  constructor(levels: number) {
    this.rows = this.makeTriangle(levels)
  }

  get lastRow() {
    return this.rows[this.rows.length - 1]
  }

  private buildRow(result: number[], element: number, index: number, array: number[]) {
    return result.concat([element + (array[index + 1] || 0)])
  }

  private makeTriangle(levels: number) {
    const result = [[1]]
    for (let x = 1; x < levels; x += 1) {
      result.push(result[x - 1].reduce(this.buildRow, [1]))
    }
    return result
  }
}
