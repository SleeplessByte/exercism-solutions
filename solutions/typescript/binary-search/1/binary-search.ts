export default class BinarySearch {
  private static isSorted(items: ReadonlyArray<number>): boolean {
    return items.every((item, index, self) => index === 0 || self[index - 1] <= item)
  }

  public readonly array: number[];

  public constructor(items: ReadonlyArray<number>) {
    this.array = BinarySearch.isSorted(items) && [...items] || undefined!
  }

  public indexOf(needle: number): number {
    let left = 0
    let right = this.array.length - 1

    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      const pivot = this.array[mid]

      if (pivot < needle) {
        left = mid + 1
      } else if (pivot > needle) {
        right = mid - 1
      } else {
        return mid
      }
    }

    return -1
  }
}
