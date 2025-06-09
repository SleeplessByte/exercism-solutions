module BeerSong
  module_function

  def recite(from, count)
    count.times.map { |i| verse(from - i) }.join("\n")
  end

  def verse(n)
    bottles = Bottles.for(n)

    "#{bottles} of beer on the wall, ".capitalize +
      "#{bottles} of beer.\n" +
      "#{bottles.action}, " +
      "#{bottles.next} of beer on the wall.\n"
  end

  class Bottles
    def self.for(n)
      begin
        BeerSong.const_get("Bottles#{n}")
      rescue NameError
        Bottles
      end.new(n)
    end

    attr_reader :count

    def initialize(count)
      @count = count
    end

    def to_s
      "#{quantity} #{container}"
    end

    def container
      "bottles"
    end

    alias quantity count

    def action
      "Take #{pronoun} down and pass it around"
    end

    def pronoun
      "one"
    end

    def next
      Bottles.for(count - 1)
    end
  end

  class Bottles0 < Bottles
    def quantity
      "no more"
    end

    def action
      "Go to the store and buy some more"
    end

    def next
      Bottles.for(99)
    end
  end

  class Bottles1 < Bottles
    def container
     "bottle"
    end

    def pronoun
      "it"
    end
  end
end

