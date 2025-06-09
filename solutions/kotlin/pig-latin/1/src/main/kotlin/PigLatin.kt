import java.lang.StringBuilder

object PigLatin {
    private val VOWELS = listOf("a", "e", "o", "u", "i", "xr", "yt")
    private val RULES = mapOf(
        ::beginsWithVowelSound to ::vowelRules,
        ::beginsWithConsonantSound to ::consonantRules
    )
    fun translate(input: String) = buildString {
        input.split(' ').forEach { word ->
            RULES.forEach { rule, action -> if (rule(word)) action(word, this) }
            append(' ')
        }
    }.trimEnd()

    private fun beginsWithVowelSound(word: String) = VOWELS.any { word.startsWith(it) }
    private fun beginsWithConsonantSound(word: String) = VOWELS.none { word.startsWith(it) }

    private fun indexOfFirstVowel(word: String): Int {
        val indexOfY = word.indexOf('y')
        val indexOfVowel = word.indexOfAny(VOWELS)

        val result = when {
            indexOfY < 1 -> indexOfVowel
            indexOfVowel == -1 -> indexOfY
            // rule 4
            indexOfY < indexOfVowel -> indexOfY
            else -> indexOfVowel
        }

        // rule 3
        return if (result > 0 && word.elementAt(result) == 'u' && word.elementAt(result - 1) == 'q') result + 1
            else result
    }

    private fun vowelRules(word: String, builder: StringBuilder) {
        // rule 1
        builder.append(word).append("ay")
    }

    private fun consonantRules(word: String, builder: StringBuilder) {
        val endOfGroup = indexOfFirstVowel(word)
        // rule 2
        builder.append(word.substring(endOfGroup)).append(word.substring(0, endOfGroup)).append("ay")
    }
}
