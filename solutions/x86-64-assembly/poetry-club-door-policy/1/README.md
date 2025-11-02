# Poetry Club Door Policy

Welcome to Poetry Club Door Policy on Exercism's x86-64 Assembly Track.
If you need help running the tests or submitting your code, check out `HELP.md`.
If you get stuck on the exercise, check out `HINTS.md`, but try and solve it without using those first :)

## Introduction

## Characters

A **character encoding** is a specific convention used to represent elements of text in a natural language as a sequence of bytes.
An "element of text" here may be any unit that has significance in a natural language, for example, letters, spaces, punctuation, emojis, ideograms, etc.

NASM (The Netwide Assembler, the assembler used by this track) has support to the definition of data using **ASCII**.

Characters in NASM have up to 8 bytes and may be defined using single quotes (`'`), double quotes (`"`) or backticks (`` ` ``):

```nasm
mov rax, '0' ; this copies the ASCII character '0' (decimal value 48)
mov rcx, "z" ; this copies the ASCII character 'z' (decimal value 122)
mov rdx, ` ` ; this copies the ASCII character ' ' (decimal value 32)
```

Special characters must be defined in backticks and escaped with `\`:

```nasm
mov rax, `\n` ; this copies the ASCII character newline (decimal value 10)
mov rcx, `\t` ; this copies the ASCII character tab (decimal value 9)
```

NASM also has support to **unicode characters** in UTF-8, specified with `\u` or `\U` and in backticks:

```nasm
mov rax, `\u263a` ; UTF-8 smiley face (☺), value U+263a
mov rcx, `\u0393` ; UTF-8 capital letter gamma (Γ), value U+0393
```

Notice that there is no built-in support to any character encoding in x86-64 as a distinct type.
Data in assembly is a sequence of bytes and the interpretation of those bytes as a character, a number, or anything else, is left to the programmer.

For instance, the ASCII character '0' is a single byte with the value 48.
So, storing 48 into a byte is exactly the same as storing the ASCII character '0':

```nasm
mov al, '0' ; al has the value 48
mov cl, 48  ; cl has the value '0'
; al and cl now have the same value
```

For this same reason, creating or changing characters is done by directly manipulating the values in those bytes:

```nasm
mov al, 'A' ; al now has the value 'A', which is 65 in ASCII
add al, 32 ; al now has the value 97, which is 'a' in ASCII
; so, summing 32 to an uppercase ASCII letter makes it lowercase

mov al, 5 ; al now has the value 5
add al, 48 ; al now has the value 53, which is '5' in ASCII
; so, summing 48 (equivalently, '0') transforms a number between 0 and 9 into a ASCII digit
```

## Strings

### Declaring strings

A **string** is a sequence of characters.
In assembly, it is usually implemented as an array.

It is possible to declare a string in NASM using the directive `db`, as usual for declared data.
Each character in a string is interpreted as a different byte (or sequence of bytes, for unicode characters with more than 1 byte).
Even though this defines an array, it is not necessary to use a comma (`,`) to separate values:

```nasm
section .data
    string1 db "hi"
    string2 db "h", "i"
    string3 db 104, 105
; string1, string2 and string3 are all equivalent
```

Similarly, since each ASCII character takes a single byte, these are all equivalent:

```nasm
section .data
    string1 dw 'hello' ; 3 words (2-byte)
    string2 dw 'he', "ll", `o` ; 3 words (2-byte)
    string3 db `hello`, 0 ; 3 words (2-byte)
```

~~~~exercism/note
In assembly, strings are not automatically ended by a ASCII NUL character (value `0`).
When interfacing with higher level languages, such as C, it is the programmer's responsibility to ensure the correct terminator, if any, is appended at the end of a string.
~~~~

### String instructions

In x86-64 there are some instructions for loading, moving and storing values in a string.

Although called _string instructions_, they can be used not only with bytes, but with other data sizes as well.
They are also not limited to sequences of elements representing characters, but work with any array in memory.

They usually expect the source to be a memory location in `rsi` and/or the destination to be a memory location in `rdi`.

Those instructions are actually a family of related instructions, each operating on a different size.
A suffix is appended to indicate this size:

| prefix | size    |
|:------:|:--------|
| b      | 1 byte  |
| w      | 2 bytes |
| d      | 4 bytes |
| q      | 8 bytes |

Those instructions modify the register(s) used according to the value of the **direction flag (DF)**.

If the DF is cleared, addresses in `rsi` and/or `rdi` are increased by the indicated size.
And, if the DF is set, addresses are instead decreased by the same amount.

The instruction `cld` clears the direction flag, whereas the instruction `std` sets it.

The System V ABI states that the direction flag must be cleared at function entry.
So, the default behavior is for memory to be read/written in ascending order of addresses.

The instructions are:

| instruction  | what it does                                          | example                                                 |
|--------------|-------------------------------------------------------|---------------------------------------------------------|
| `lods`       | loads from the memory location in `rsi` into `rax`    | `lodsw` loads 2 bytes into `ax`, changing `rsi` by 2    |
| `stos`       | stores `rax` into the memory location in `rdi`        | `stosd` stores 4 bytes from `eax`, changing `rdi` by 4  |
| `movs`       | copies between memory locations (`rsi` to `rdi`)      | `movsb` copies 1 byte, changing `rsi` and `rdi` by 1    |
| `cmps`       | compares between memory locations (`rsi` and `rdi`)   | `cmpsq` compares 8 bytes, changing `rsi` and `rdi` by 8 |
| `scas`       | compares `rax` with value in memory location in `rdi` | `scasb` compares `al`, changing `rdi` by 1              |

Both `cmps` and `scas` make comparisons following the same semantics as `cmp`, setting flags accordingly.

Apart from those, the `rep` family of instructions do not interact directly with memory.

Instead, they can be added as prefixes to the other mentioned instructions, _repeating_ them.
They repeat an instruction by a number of times equal to the value in `rcx`.
At each time, the value in `rcx` is decreased by 1.

Note, however, that `rcx` is not an operand to those instructions.
Its value must be adjusted before using them.

Apart from using `rcx` as a counter, `repe` (or `repz`) and `repne` (or `repnz`) also stop execution if the zero flag (ZF) is cleared or set, respectively.

There are 3 instructions in this group:

| instruction      | where can be added     | may stop earlier          |
|------------------|------------------------|---------------------------|
| `rep`            | `movs`, `lods`, `stos` | no                        |
| `repe`,`repz`    | `cmps`, `scas`         | yes — stops when ZF is 0  |
| `repne`, `repnz` | `cmps`, `scas`         | yes — stops when ZF is 1  |

## Instructions

A new poetry club has opened in town, and you're thinking of attending.
Because there have been incidents in the past, the club has a very specific door policy which you'll need to master, before attempting entry.

There are two doors at the poetry club, a front and a back door, and both are guarded.
To gain entry, you'll need to work out the password of the day.

The password is always based on a poem and can be derived in a two-step process.

1. The guard will recite the poem, one line at a time and you have to respond with an appropriate letter of that line.
2. The guard will now tell you all the letters you responded with at once, and you need to write them down on a piece of paper in a specific format.

The details of the process depend on which door you are trying to enter.

~~~~exercism/note
All strings in this exercise will be ASCII-encoded and NUL-terminated.
This means all characters use ASCII encoding and every string ends when the '\0' (the NUL character, with value `0`) is found.
~~~~

~~~~exercism/note
These are the string instructions mentioned in this concept:

| instruction  | what it does                                          |
|--------------|-------------------------------------------------------|
| `lods`       | loads from the memory location in `rsi` into `rax`    |
| `stos`       | stores `rax` into the memory location in `rdi`        |
| `movs`       | copies between memory locations (`rsi` to `rdi`)      |
| `cmps`       | compares between memory locations (`rsi` and `rdi`)   |
| `scas`       | compares `rax` with value in memory location in `rdi` |

These instructions repeat one of the string instructions:

| instruction      | where can be added     | may stop earlier          |
|------------------|------------------------|---------------------------|
| `rep`            | `movs`, `lods`, `stos` | no                        |
| `repe`,`repz`    | `cmps`, `scas`         | yes — stops when ZF is 0  |
| `repne`, `repnz` | `cmps`, `scas`         | yes — stops when ZF is 1  |
~~~~

## 1. Get the first letter of a sentence

To determine the letters for the front door password, you need to respond with the first letter of the line of the poem, that the guard recites to you.

To end up with a nice password, the members of the poetry club like to use _acrostic_ poems.
This means that the first letter of each sentence forms a word.
Here is an example by one of their favorite writers Michael Lockwood.

```text
Stands so high
Huge hooves too
Impatiently waits for
Reins and harness
Eager to leave
```

So when the guard recites **Stands so high**, you'll respond **S**, when the guard recites **Huge hooves too**, you'll respond **H**.

Implement the function `front_door_response` that takes the address in memory for a line of the poem as an argument and returns the first letter of that line.
This letter must be returned as a ASCII-encoded character, occupying 1 byte.

```c
front_door_response("Stands so high");
// => 'S'
```

## 2. Capitalize a word

Now that you have all the correct letters, all you need to do to get the password for the front door is to correctly capitalize the word.

Implement the function `front_door_password` that takes as argument the address in memory for a string containing only the combined letters you found in task 1.
It should modify the input string [in-place][in-place], so it is correctly capitalized.
This means that the correct string should be stored in the same memory location of the input.

The function has no return value.

```c
front_door_password('SHIRE');
// => buffer == "Shire"

front_door_password('shire');
// => buffer == "Shire"
```

## 3. Get the last letter of a sentence

To determine letters for the back door password, you need to respond with the last letter of the line of the poem that the guard recites to you.

The members of the poetry club are really clever.
The poem mentioned before is also _telestich_, which means that the last letter of each sentence also forms a word:

```text
Stands so high
Huge hooves too
Impatiently waits for
Reins and harness
Eager to leave
```

When the guard recites **Stands so high**, you'll respond **h**, when the guard recites **Huge hooves too**, you'll respond **o**.

Note that sometimes the guard does stylistic pauses (in the form of punctuation or whitespace) when reciting the poem.
You will need to ignore those pauses to derive the correct letter.

Implement the function `back_door_response` that takes as argument the address in memory for a line of the poem and returns the last letter of that line.
This letter must be returned as a ASCII-encoded character, occupying 1 byte.

```c
back_door_response('Stands so high');
// => "h"

back_door_response('Stands ... so high   ');
// => "h"
```

## 4. Be polite

To enter the poetry club via the back door, you need to be extra polite.
So to derive the password, this time you need to correctly capitalize the word and add `", please."` at the end.

Implement the function `back_door_password` that accepts as arguments, in this order:

1. The address in memory for a buffer where the resulting string will be stored.
2. The address in memory for a string containing the combined letters you found in task 3.

The function should store the polite version of the capitalized password in the [buffer][buffer].
A _buffer_ is an array which can be used to store values in memory to move them between different functions.

This function has no return value.

```c
back_door_password("horse");
// => "Horse, please."
```

[in-place]: https://en.wikipedia.org/wiki/In-place_algorithm
[buffer]: https://en.wikipedia.org/wiki/Data_buffer

## Source

### Created by

- @oxe-i