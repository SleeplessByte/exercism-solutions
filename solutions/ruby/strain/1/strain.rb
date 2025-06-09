class Array
  alias keep select
  alias discard reject
end

=begin
# Implementation

class Array
  def keep(&block)
    each_with_object([]) do |item, result|
      result << item if block.call(item)
    end
  end

  def discard(&block)
    each_with_object([]) do |item, result|
      result << item unless block.call(item)
    end
  end
end

=end
