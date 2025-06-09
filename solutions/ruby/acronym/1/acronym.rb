module Acronym
  module_function

  def abbreviate(input)
    input.scan(/\b[[:alpha:]]/)
         .join
         .upcase
  end
end
