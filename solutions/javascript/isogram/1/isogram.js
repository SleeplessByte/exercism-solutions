//
// This is only a SKELETON file for the 'Isogram' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const isIsogram = (input) => {
  const inputWithoutHyphensOrSpaces = input.replace(/ |-/g, '');
  
  const uniqueLetters = inputWithoutHyphensOrSpaces
    .toLowerCase()
    .split('')
    .filter((element, index, self) => self.indexOf(element) === index);
  
  return uniqueLetters.length === inputWithoutHyphensOrSpaces.length;
};