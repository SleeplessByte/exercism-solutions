defmodule Bob do
  def hey(input) do
    cond do
      String.length(String.trim(input)) == 0 -> "Fine. Be that way!"
      String.ends_with?(input, "?") -> cond do
        input == String.upcase(input) && input != String.downcase(input) -> "Calm down, I know what I'm doing!"
        true -> "Sure."
      end
      input == String.upcase(input) && input != String.downcase(input) -> "Whoa, chill out!"
      true -> "Whatever."
    end
  end
end
