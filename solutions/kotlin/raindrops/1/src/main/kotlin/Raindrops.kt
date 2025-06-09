object Raindrops {
    private val NAMED_FACTORS = mapOf(3 to "Pling", 5 to "Plang", 7 to "Plong")

    fun convert(drops: Int) =
        NAMED_FACTORS
            .filterKeys { factor -> drops % factor == 0 }
            .values
            .joinToString("")
            .let { // Can't use ifEmpty, because kotlin version is set to 1.2.40, and it's 1.3
                if (it.isEmpty()) drops.toString() else it
            }
}