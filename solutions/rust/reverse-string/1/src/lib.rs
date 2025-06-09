extern crate unicode_segmentation;

use unicode_segmentation::UnicodeSegmentation;


pub fn reverse(input: &str) -> String {
    input.chars().rev().collect()
}

// Implemented this separately using an external crate. The idea is exactly
// the same: turn the input into an iterator over each 'character', reverse
// the iterator, walk it and join all the characters.
//
// Unicode is incredibly complex and writing this myself would be pointless
// other than a lót of exercise.
//
pub fn reverse_bonus(input: &str) -> String {
    input.graphemes(true).rev().collect()
}