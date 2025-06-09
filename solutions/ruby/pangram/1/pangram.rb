module Pangram
  module_function

  def pangram?(input)
    normalized = input.downcase
    ('a'..'z').all? { |letter| normalized.include? letter }
  end
end
