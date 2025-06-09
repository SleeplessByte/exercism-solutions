# frozen_string_literal: true

module Bob
  module_function

  def hey(input)
    return answer_silence if silence?(input)
    return answer_question(input) if asking?(input)
    return answer_shouting if shouting?(input)

    answer
  end

  class << self
    protected

    SILENCE   = /\A\s*\z/.freeze
    ASKING    = /\?\s*\z/.freeze
    SHOUTING  = /\A[^A-Za-z]*[A-Z]+(?:[^a-z]*)\z/.freeze

    def silence?(input)
      input =~ SILENCE
    end

    def shouting?(input)
      input =~ SHOUTING
    end

    def asking?(input)
      input =~ ASKING
    end

    def answer_silence
      'Fine. Be that way!'
    end

    def answer_question(input)
      return "Calm down, I know what I'm doing!" if shouting?(input)
      
      'Sure.'
    end

    def answer_shouting
      'Whoa, chill out!'
    end

    def answer
      'Whatever.'
    end
  end
end
