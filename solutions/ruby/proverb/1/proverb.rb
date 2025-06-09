class Proverb
  include Enumerable

  def initialize(want, *consequences, qualifier: nil)
    self.want = want
    self.consequences = consequences
    self.qualifier = qualifier
  end

  def each
    return to_enum(:each) unless block_given?

    each_consequence do |(want, consequence)|
      yield "For want of a #{want} the #{consequence} was lost."
    end

    yield "And all for the want of a #{qualified_want}."
  end

  def to_s
    each.map(&:itself).join("\n")
  end

  private

  def each_consequence(&block)
    [want, *consequences].each_cons(2, &block)
  end

  def qualified_want
    "#{qualifier} #{want}".strip
  end

  attr_accessor :want, :consequences, :qualifier
end
