% Looking at the test, Dna is considered the "result". In other
% languages this may be the return value.
%
% First lets define a series of if -> then ; else statements to
% define each transition. The final case does not need to be
% present but should result in an instant cut-off of matching
% and forced failure.
%
% Note that this uses chars (single quote), because that is what
% will be passed eventually...

rna_transcribe(RnaBase, DnaBase) :-
  (   RnaBase = 'C' -> DnaBase = 'G'
    ; RnaBase = 'G' -> DnaBase = 'C'
    ; RnaBase = 'T' -> DnaBase = 'A'
    ; RnaBase = 'A' -> DnaBase = 'U'
    ; !, fail
  ).

% Of course, there can be more than one nucleotide in the RNA,
% which should be taken care of. This can be achieved by doing a
% conversion of the Rna to a list and the Dna to a list, and then
% processing each individual item.

rna_transcription(Rna, Dna) :-
  string_chars(Rna, RnaChars),
  rna_transcription_chars(RnaChars, DnaChars),
  string_chars(Dna, DnaChars).

% In case the lists are empty, it should stop processing. This
% means "recursion" can be used to keep translating a single
% character and the remainder of the list, until that remainder
% is empty.

rna_transcription_chars([], []) :- !.

% In case the lists are not empty, the Rna is not empty, and it
% can be split in a single character and the remainder of the
% list of characters.
%
% The result is the transcribed single character followed by the
% transcription of the rest of the list. Remember that this
% automatically stops because of the empty list case above.

rna_transcription_chars([RnaHead | RnaTail], [DnaHead | DnaTail]) :-
    rna_transcribe(RnaHead, DnaHead),
    rna_transcription_chars(RnaTail, DnaTail).
