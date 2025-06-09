function buildRow(result, element, index, array) {
  return result.concat([element + (array[index + 1] || 0)])
}

function makeTriangle(levels) {
  const result = [[1]]
  for (let x = 1; x < levels; x += 1) {
    result.push(result[x - 1].reduce(buildRow, [1]))
  }
  return result
}

export class Triangle {
  constructor(levels) {
    this.rows = makeTriangle(levels)
  }

  get lastRow() {
    return this.rows[this.rows.length - 1]
  }
}
