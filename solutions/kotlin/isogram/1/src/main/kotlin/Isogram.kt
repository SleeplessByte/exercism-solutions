object Isogram {
    fun isIsogram(input: String) =
        input.toLowerCase()
             .filter { it.isLetter() }
             .groupBy { it }
             .values
             .none { it.size > 1 }
}