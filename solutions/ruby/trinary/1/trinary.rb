class Trinary
  def initialize(trinary)
    self.bits = to_bits(trinary)
  end

  def to_decimal
    bits.reverse.each_with_index.inject(0) do |sum, (bit, position)|
      sum + (bit.to_i * 3**position)
    end
  end

  private

  attr_accessor :bits

  def to_bits(trinary)
    return trinary.chars if trinary =~ /\A[012]*\z/

    []
  end
end
