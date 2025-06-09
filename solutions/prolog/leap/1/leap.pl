% The result of A mod B can be checked for equality using =:= or
% checked for inequality using =\=. There are three cases to
% consider.
%
% 1. if not divisible by 4, it is not a leap year
% 2. if divisible by 4, and it is not divisible by 100, it can stop. It is leap.
% 3. if divisible by 100, it must also be divisble by 400 to be leap.
%
% When the first line fails, it checks again if maybe it is divisble by both 4
% and 100, by checking if it is divisbile by 4 * 100. This tackles case 3 and 1.
% When the first line succeeds, it is case 2.

leap(YEAR) :-
    YEAR mod 4 =:= 0, YEAR mod 100 =\= 0, !;
    YEAR mod 400 =:= 0.
