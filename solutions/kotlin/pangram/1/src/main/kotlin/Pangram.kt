object Pangram {
  fun isPangram(input: String): Boolean {
    return input
      .toLowerCase()
      .filter { it.isLetter() }
      .groupBy { it }
      .size == 26
  }
}
