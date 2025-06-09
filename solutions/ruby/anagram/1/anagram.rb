class Anagram
  def initialize(input)
    self.normalized = input.downcase
    self.characters = normalized.chars.sort!
  end

  def match(options)
    options.select { |option|
      normalized_option = option.downcase
      normalized_option != normalized && normalized_option.chars.sort! == characters
    }
  end

  private

  attr_accessor :normalized, :characters
end
