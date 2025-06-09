% The hamming distance counts the amount of characters that do not match at the
% same index in both observed strings.
%
% It helps to convert the string atoms to lists of characters first, and then
% calculate the distance between those lists.

hamming_distance(Left, Right, Dist) :-
  string_chars(Left, ListLeft),
  string_chars(Right, ListRight),
  hamming_list_distance(ListLeft, ListRight, Dist).

% Start with the base case that both strands are empty.

hamming_list_distance([], [], 0).

% Otherwise, the heads must be compared. There are only two cases, written out
% explicitly to make it super clear.
%
% - Either the inspected bases are the same, in which case the hamming distance
%   is the same as if the two bases are not there;
% - Or the inspected bases are not the same (else case). The distance is then
%   equal to the distance of the remainder of the strand plus 1.

hamming_list_distance([HeadLeft | TailLeft], [HeadRight | TailRight], Dist) :-
  (
    HeadLeft = HeadRight ->
      hamming_list_distance(TailLeft, TailRight, Dist)
    ; hamming_list_distance(TailLeft, TailRight, TailDist), Dist is TailDist + 1
  ).
