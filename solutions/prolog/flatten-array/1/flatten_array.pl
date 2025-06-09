% In order to flatten the array, whilst "traversing" it, at each point,
% if it encounters a list, it should flatten it first before moving on.
%
% The base case is the empty list, which is... an empty list.

flatten_list([], []).

% The next case is the head item being a nested list. In this case,
% that nested list is flattened completely into a list, the remainder
% is also flattend into a list, and then the lists are concatenated
% into the final result.
%
% Because this is calling the same flatten_list, we can be certain
% that as long as the other predicates work, the result, Flattened,
% is in fact a completely flat list.

flatten_list([HeadDeep | TailDeep], Flattened) :-
    is_list(HeadDeep),
    flatten_list(HeadDeep, HeadFlat),
    flatten_list(TailDeep, TailFlat),
    append(HeadFlat, TailFlat, Flattened), !.

% When a nil is encountered, it should be ignored, and the result
% is the flattended list of the remainder of the items.

flatten_list([HeadDeep | TailDeep], Flattened) :-
    HeadDeep = nil,
    flatten_list(TailDeep, Flattened), !.

% Finally, when the head item in the list is NOT a nil, OR a list,
% the base case of "just a value" can be applied, and the head item
% in the unflattened list becomes the head item in the flattened.

flatten_list([HeadDeep | TailDeep], [HeadDeep | Flattened]) :-
    flatten_list(TailDeep, Flattened), !.
