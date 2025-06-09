
require 'forwardable'

class HighScores
  extend Forwardable

  attr_reader :scores

  def initialize(scores)
    self.scores = scores.dup
  end

  def_delegators :@scores, :max, :last, :sort
  alias latest last
  alias personal_best max

  def personal_top
    scores.sort.last(3).reverse!
  end

  def report
    last_score = latest
    difference = personal_best - last_score

    # I rather repeat part of the string, but keep it i18n, than to "combine" and squeeze it,
    # but have to change it completely down the line.

    format("Your latest score was %<latest>d. %<difference>s",
      latest: last_score,
      difference: difference.zero? ?
        "That's your personal best!" :
        "That's #{difference} short of your personal best!"
    )
  end

  private

  attr_writer :scores
end
