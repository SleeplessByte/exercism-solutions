using System;
using System.Linq;

public static class Pangram
{
    public static bool IsPangram(string input)
    {
        string normalized = input.ToLower();
        return Enumerable.Range('a', 'z' - 'a')
            .All(codepoint => normalized.Contains(Convert.ToChar(codepoint)));
    }
}
