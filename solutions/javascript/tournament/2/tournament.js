class TeamTally {
  static sort(teamTallies) {    
    return teamTallies.sort((a, b) => {
      // Sort by points
      const pointsComparison = b.points - a.points
      if (pointsComparison != 0) {
        return pointsComparison
      }
  
      // Sort by name
      return a.name.localeCompare(b.name)
    });
  }
  
  constructor(name) {
    this.name = name;
    
    this.wins = 0;
    this.draws = 0;
    this.losts = 0;
  }

  won() {
    this.wins += 1;
  }

  lost() {
    this.losts += 1;
  }

  drawn() {
    this.draws += 1;
  }
  
  get points() {
    return this.wins * 3 + this.draws
  }

  get matchesPlayed() {
    return this.wins + this.draws + this.losts
  }

}

const HEADER = 'Team                           | MP |  W |  D |  L |  P'
const LENGTH_NAME = 'Team                          '.length
const LENGTH_DATA = 'MP'.length

export function tournamentTally(input) {
  const lines = input.split("\n")

  // Calculate the tally, sort by points & names
  const tally = TeamTally.sort(process(lines));

  // Make the tallied output
  const output = tally.map(makeOutput)

  // Output concatenated lines
  return [HEADER].concat(output).join("\n")
}

function process(lines) {
  const data = {}
  
  for (const line of lines) {
    // Handle empty input
    if (line.length === 0) {
      continue;
    }

    // Read the line
    const [teamA, teamB, result] = line.split(';')
    
    // Make sure we have an entry for both teams, or initialize
    data[teamA] = data[teamA] ?? new TeamTally(teamA)
    data[teamB] = data[teamB] ?? new TeamTally(teamB)
    
    // Process the information
    switch (result) {
      case 'win': {
        data[teamA].won();
        data[teamB].lost();
        break;
      }
      case 'draw': {
        data[teamA].drawn();
        data[teamB].drawn();
        break;
      }
      case 'loss': {
        data[teamB].won();
        data[teamA].lost();
        break;
      }
    }
  }

  return Object.values(data);
}

function makeOutput(teamTally) {
  const data = [
    teamTally.name,
    teamTally.matchesPlayed,
    teamTally.wins,
    teamTally.draws,
    teamTally.losts,
    teamTally.points
  ]

  return data.map(format).join(' | ')
};


function format(datum, index) {
  if (index === 0) {
    return String(datum).padEnd(LENGTH_NAME, ' ');
  }

  return String(datum).padStart(LENGTH_DATA, ' ');
}