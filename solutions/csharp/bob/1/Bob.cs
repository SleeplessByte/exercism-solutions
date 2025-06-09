using System;
using System.Text.RegularExpressions;


public static class Bob
{
    static Regex _silence = new Regex(@"^\s*$", RegexOptions.Compiled);
    static Regex _asking = new Regex(@"\?\s*$", RegexOptions.Compiled);
    static Regex _shouting = new Regex(@"^[^A-Za-z]*[A-Z]+(?:[^a-z]*)$", RegexOptions.Compiled);

    public static string Response(string statement)
    {
        if (_silence.IsMatch(statement)) {
            return "Fine. Be that way!";
        } else if (_asking.IsMatch(statement)) {
            return _shouting.IsMatch(statement) ? "Calm down, I know what I'm doing!" : "Sure.";
        } else if (_shouting.IsMatch(statement)) {
            return "Whoa, chill out!";
        } else {
            return "Whatever.";
        }
    }
}
