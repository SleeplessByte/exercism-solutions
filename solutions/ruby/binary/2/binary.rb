##
# An earlier version of this exercise used to have to_octal and to_hexadecimal
#  tests as well. I've left the implementation in because it still works and
#  makes visible how extendible this solution is.
module Binary
  module_function

  def to_octal(binary)
    to_decimal(binary).to_s(8)
  end

  def to_decimal(binary)
    bits(binary).reverse.each_with_index.inject(0) do |sum, (bit, position)|
      sum + (bit == '0' ? 0 : 2**position)
    end
  end

  def to_hexadecimal(binary)
    to_decimal(binary).to_s(16)
  end

  # This hides bits from callers
  class << self
    protected

    def bits(binary)
      return binary.chars if binary =~ /\A[01]*\z/

      throw ArgumentError, 'Not a binary number'
    end
  end
end
