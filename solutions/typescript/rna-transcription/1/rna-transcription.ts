class Transcriptor {
  private static readonly TRANSCRIPTION = {
    C: 'G',
    G: 'C',
    A: 'U',
    T: 'A',
  }

  toRna(strand: string): string {
    return [...strand].map(this.transcribe).join('')
  }

  private transcribe(nucleotide: keyof typeof Transcriptor.TRANSCRIPTION): typeof Transcriptor.TRANSCRIPTION[typeof nucleotide] {
    if (!Transcriptor.TRANSCRIPTION[nucleotide]) {
      throw new Error('Invalid input DNA.')
    }

    return Transcriptor.TRANSCRIPTION[nucleotide]
  }
}

export default Transcriptor
