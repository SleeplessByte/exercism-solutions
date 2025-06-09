% In Two-Fer, the exercise boils down to string concatenation of:
% - "One for"
% - a variable input
% - ", one for me"
%
% When the variable input is not given, it must default to "you".
% guarded with this information, the predicate can be written to
% set-up the default value.

two_fer(Dialogue) :- 
    two_fer("you", Dialogue).

% Finally, a bit of knowledge about string_concat/3 is helpful.
% This will store the result in the third argument, which may
% be unbound. In classical terms: the result will be stored in
% the third argument and this acts like a variable if it was
% not yet defined.
%
%
% - first concatenate "One for " and Name, and store in the 
%   unbound X
% - then concatenate X with the ", one for me." postfix and
%   store in arg Dialogue
% - Dialogue is tested

two_fer(Name, Dialogue) :-
    string_concat("One for ", Name, X),
    string_concat(X, ", one for me.", Dialogue).
