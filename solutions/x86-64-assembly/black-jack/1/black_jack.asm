; Black Jack

C2 equ 2
C3 equ 3
C4 equ 4
C5 equ 5
C6 equ 6
C7 equ 7
C8 equ 8
C9 equ 9
C10 equ 10
CJ equ 11
CQ equ 12
CK equ 13
CA equ 14

TRUE equ 1
FALSE equ 0

section .text

; You should implement functions in the .text section
; A skeleton is provided for the first function

; the global directive makes a function visible to the test files
global value_of_card
value_of_card:
    ; This function takes as parameter a number representing a card
    ; - passed in card ; di(l)
    ; The function should return the numerical value of the passed-in card
    
    cmp dil, CJ           ; sets CF to 1 if card < 11 (2 through 10)
    jc  value_of_card.pip ; CF is 1, so it's a pip card

    cmp dil, CA           ; sets ZF to 1 if card = 14 (Ace)
    je  value_of_card.ace ; ZF is 1, so it's an ace

    ; else it's a face card
    mov al, 10
    ret
    
.pip: 
    mov al, dil
    ret

.ace:
    mov al, 1
    ret

global higher_card
higher_card:
    ; This function takes as parameters two numbers each representing a card
    ; - first card  ; di(l)
    ; - second card ; si(l)
    ; The function should return which card has the higher value
    ; If both have the same value, both should be returned
    ; If one is higher, the second one should be 0

    mov r8b, dil ; store first card
    mov r9b, sil ; store second card

    ; Get the value of the first card and store in cl
    ; No need to prepare the call, di(l) already set
    call value_of_card
    mov cl, al

    ; Get the value of the second card and keep in al
    mov dil, sil         ; prepare call
    call value_of_card

    ; Compare the two values
    cmp cl, al
    jb higher_card.lt    ; cl < al
    ja higher_card.gt    ; cl > al
                         ; cl = al

    ; Return both
    mov al, r8b
    mov dl, r9b
    ret

.lt: ; value of dil < value of sil
    mov al, r9b ; return original sil
    mov dl, 0   ; ensure cleared
    ret

.gt: ; value of dil > value of sil
    mov al, r8b ; return original dil
    mov dl, 0   ; ensure cleared
    ret 

global value_of_ace
value_of_ace:
    ; This function takes as parameters two numbers each representing a card
    ; - first card  ; di(l)
    ; - second card ; si(l)
    ; The function should return the value of an upcoming ace

    ; If first card is CA or second card is CA, result is 1
    cmp dil, CA
    je value_of_ace.one 
    cmp sil, CA
    je value_of_ace.one 
    
    ; Convert first card to value
    call value_of_card
    mov r8b, al    ; store first card value

    ; Convert second card to value
    mov dil, sil
    call value_of_card
    mov r9b, al    ; store second card value

    ; Sum the two card values
    add r8b, r9b

    ; If sum of values is > 10, result is 1
    cmp r8b, 10
    jg value_of_ace.one 
    
    ; Default case is 11
    mov al, 11
    ret
    
.one:
    mov al, 1
    ret

global is_blackjack
is_blackjack:
    ; This function takes as parameters two numbers each representing a card
    ; - first card  ; di(l)
    ; - second card ; si(l)
    ; The function should return TRUE if the two cards form a blackjack, and FALSE otherwise
    cmp dil, CA
    je  is_blackjack.needs_face

    cmp dil, C10
    jg  is_blackjack.needs_ace
    jmp is_blackjack.false

.needs_face:
    cmp sil, CA
    je is_blackjack.false
    
    cmp dil, C10
    jg is_blackjack.true
    jmp is_blackjack.false

.needs_ace:
    cmp sil, CA
    je is_blackjack.true
    jmp is_blackjack.false
    
.true:
    mov al, TRUE
    ret

.false:
    mov al, FALSE
    ret

global can_split_pairs
can_split_pairs:
    ; This function takes as parameters two numbers each representing a card
    ; - first card  ; di(l)
    ; - second card ; si(l)
    ; The function should return TRUE if the two cards can be split into two pairs, and FALSE otherwise

    ; Convert first card to value
    call value_of_card
    mov r8b, al    ; store first card value

    ; Convert second card to value
    mov dil, sil
    call value_of_card
    mov r9b, al    ; store second card value

    cmp r8b, r9b
    je can_split_pairs.yes_we_can

    mov al, FALSE
    ret
    
.yes_we_can:
    mov al, TRUE
    ret

global can_double_down
can_double_down:
    ; This function takes as parameters two numbers each representing a card
    ; - first card  ; di(l)
    ; - second card ; si(l)
    ; The function should return TRUE if the two cards form a hand that can be doubled down, and FALSE otherwise

    ; Convert first card to value
    call value_of_card
    mov r8b, al    ; store first card value

    ; Convert second card to value
    mov dil, sil
    call value_of_card
    mov r9b, al    ; store second card value

    ; Sum the two card values
    add r8b, r9b

    ; Check if 9 <= sum <= 11
    cmp r8b, 9
    jb can_double_down.nope ; < 9
    cmp r8b, 11
    ja can_double_down.nope ; > 11

    mov al, TRUE
    ret
    
.nope:
    mov al, FALSE
    ret

%ifidn __OUTPUT_FORMAT__,elf64
section .note.GNU-stack noalloc noexec nowrite progbits
%endif
