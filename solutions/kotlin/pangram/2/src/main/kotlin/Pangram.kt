object Pangram {
  fun isPangram(input: String): Boolean {
    return input.toLowerCase().let {
      ('a'..'z').all { letter -> letter in it }
    }
  }
}
