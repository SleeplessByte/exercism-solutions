function invalidValue() {
  throw new Error('Invalid nucleotide in strand')
}

export function countNucleotides(dna) {
  /[^ACGT]/.test(dna) && invalidValue()

  const counts = { A: 0, C: 0, G: 0, T:0 };
  const { length } = dna
  for (let i = 0; i < length; i++) {
    counts[dna[i]]++
  }
  return Object.values(counts).join(' ')
}

