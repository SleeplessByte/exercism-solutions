// - If the number has 3 as a factor, output 'Pling'.
// - If the number has 5 as a factor, output 'Plang'.
// - If the number has 7 as a factor, output 'Plong'.
// - Otherwise output the input

const FACTORS: [usize; 3] = [3, 5, 7];
const OUTPUTS: [&str; 3] = ["Pling", "Plang", "Plong"];

pub fn raindrops(n: usize) -> String {
    // Iterate over the factors array, but unshift an index (enumeration argument), so that
    // the correct output can be fetched.
    //
    // Fold is the same as inject / reduce
    //
    let output = FACTORS.iter().enumerate().fold(String::new(), |acc, (index, factor)|
         if n % factor == 0 { acc.to_owned() + OUTPUTS[index] } else { acc }
    );

    // If nothing matched, turn the digits into a string
    if output.is_empty() { n.to_string() } else { output }
}