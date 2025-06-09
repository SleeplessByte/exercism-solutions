real((X, _), X).

imaginary((_, Y), Y).

% Rr is repeated for clarity
%
conjugate(X, R) :-
  real(X, Xr), imaginary(X, Xi),
  Rr is Xr, Ri is -Xi,
  real(R, Rr), imaginary(R, Ri).

% Absolute value of (a + bi) is sqrt(a^2 + b^2)
%
abs(X, R) :-
  real(X, Xr), imaginary(X, Xi),
  R is sqrt(Xr * Xr + Xi * Xi).

% The following would have worked:
%  X is X + R,
%  Y is Y + D.
%
add(X, Y, R) :-
  real(X, Xr), imaginary(X, Xi),
  real(Y, Yr), imaginary(Y, Yi),
  Rr is Xr + Yr, Ri is Xi + Yi,
  real(R, Rr), imaginary(R, Ri).

% The following would have worked:
%  X is X - R,
%  Y is Y - D.
%
sub(X, Y, R) :-
  real(X, Xr), imaginary(X, Xi),
  real(Y, Yr), imaginary(Y, Yi),
  Rr is Xr - Yr, Ri is Xi - Yi,
  real(R, Rr), imaginary(R, Ri).


% (3 + 2i)(1 + 7i)
%   = 3×1 + 3×7i + 2i×1+ 2i×7i
%   = 3 + 21i + 2i + 14i2
%   = 3 + 21i + 2i − 14
%   (because i2 = −1)
%   = (−11 + 23i)
%
% The following would have worked:
% X is X * R + -1 * (Y * D),
% Y is X * D + Y * R.
%
mul(X, Y, R) :-
  real(X, Xr), imaginary(X, Xi),
  real(Y, Yr), imaginary(Y, Yi),
  Rr is Xr * Yr + -1 * (Xi * Yi),
  Ri is Xr * Yi + Xi * Yr,
  real(R, Rr), imaginary(R, Ri).

% (2 + 3i4 / 4 − 5i)
%  *= conjugate of 4 − 5i = (4 + 5i / 4 + 5i)
%   = (2 + 3i4 / 4 − 5i) * (4 + 5i / 4 + 5i)
%   = (8 + 10i + 12i + 15i2) / 16 + 25
%   = (−7 + 22i) / 41
%   (because 8 + 15 * -1)
%   = ([−7 / 41] + [22 / 41]i)
div(X, Y, R) :-
  conjugate(Y, Yconjugate),
  mul(X, Yconjugate, Rtop),
  mul(Y, Yconjugate, RYottom),
  real(Rtop, Rrnom),
  imaginary(Rtop, Rinom),
  real(RYottom, Rdenom),
  Rr is Rrnom / Rdenom,
  Ri is Rinom / Rdenom,
  real(R, Rr), imaginary(R, Ri).
