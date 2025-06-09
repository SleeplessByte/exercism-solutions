class Hexadecimal
  def initialize(hexadecimal)
    self.bits = to_bits(hexadecimal)
  end

  def to_decimal
    bits.reverse.each_with_index.inject(0) do |sum, (bit, position)|
      sum + (convert(bit) * 16**position)
    end
  end

  private

  attr_accessor :bits

  def to_bits(hexadecimal)
    return hexadecimal.chars if hexadecimal =~ /\A[0-9a-f]*\z/

    []
  end

  MAPPING = Hash[((0..9).to_a + ('a'..'f').to_a).each_with_index.map { |c, i| [c.to_s, i] }]

  def convert(bit)
    # I could have used bit.to_i(16), but then again I could have used input.to_i(16) and be done
    # The solution above is extendible to other number formats (e.g. duodecimal)
    MAPPING[bit]
  end
end
