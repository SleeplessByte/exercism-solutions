# frozen_string_literal: true

module Bob
  module_function

  def hey(input)
    return answer_silence if silence?(input)
    return answer_question(input) if asking?(input)
    return answer_shouting if shouting?(input)

    answer_anything_else
  end

  class << self
    protected

    SILENCE   = /\A\s*\z/.freeze
    ASKING    = /\?\s*\z/.freeze
    SHOUTING  = /\A[^A-Za-z]*[A-Z]+(?:[^a-z]*)\z/.freeze

    def silence?(input)
      SILENCE.match?(input)
    end

    def shouting?(input)
      SHOUTING.match?(input)
    end

    def asking?(input)
      ASKING.match?(input)
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

    def answer_anything_else
      'Whatever.'
    end
  end
end
