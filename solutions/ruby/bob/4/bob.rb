module Bob
  module_function

  def hey(input)
    case input
      when silence?(input) return answer_silence
      when asking?(input) return answer_question(input)
      when shouting?(input) return answer_shouting
      else return answer
    end
  end

  class << self
    protected

    SILENCE   = /\A\s*\z/
    ASKING    = /\?\s*\z/
    SHOUTING  = /\A[^A-Za-z]*[A-Z]+(?:[^a-z]*)\z/

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
      shouting?(input) ? "Calm down, I know what I'm doing!" : 'Sure.'
    end

    def answer_shouting
      'Whoa, chill out!'
    end

    def answer
      'Whatever.'
    end
  end
end
