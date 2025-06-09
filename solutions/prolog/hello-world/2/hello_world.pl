% Please visit https://exercism.io/tracks/prolog/installation
% for instructions on setting up prolog.
% Visit https://exercism.io/tracks/prolog/tests
% for help running the tests for prolog exercises.

% Replace the goal below with
% your implementation.

% Shameless green facts. Defines all the hello worlds:
hello_world('Hello World!').
% hello_world('Alice', 'Hello Alice!').
% hello_world('Bob', 'Hello Bob!').

% Actual implementation
%
% http://www.swi-prolog.org/pldoc/doc_for?object=format/3
% [Name] is formatted so it becomes 'Hello Name!'
% Output is the atom(Greeting)
% http://www.swi-prolog.org/pldoc/doc_for?object=atom/1
%
hello_world(Name, Greeting) :-
  format(atom(Greeting), 'Hello ~w!', [Name]).
