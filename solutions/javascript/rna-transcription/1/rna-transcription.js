const TRANSCRIPTION = {
  C: 'G',
  G: 'C',
  A: 'U',
  T: 'A',
};

function invalidInput() {
  throw new Error('Invalid input DNA.')
}

export function toRna(sequence) {
  return sequence
    .split('')
    .map(nucleotide => TRANSCRIPTION[nucleotide] || invalidInput())
    .join('');
}
