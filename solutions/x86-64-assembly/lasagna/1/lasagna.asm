; Everything that comes after a semicolon (;) is a comment

; Assembler-time constants may be defined using 'equ'
TIME_PER_LAYER equ 2


section .text

; You should implement functions in the .text section
; A skeleton is provided for the first function

; the global directive makes a function visible to the test files
global expected_minutes_in_oven
expected_minutes_in_oven:
    ; This function has no arguments
    ; and must return a number
    mov rax, 40
    ret

global remaining_minutes_in_oven
remaining_minutes_in_oven:
    call expected_minutes_in_oven
    sub rax, rdi
    ret

global preparation_time_in_minutes
preparation_time_in_minutes:
    mov rax, rdi
    imul rax, TIME_PER_LAYER
    ret

global elapsed_time_in_minutes
elapsed_time_in_minutes:
    call preparation_time_in_minutes ; passes rdi
    add rax, rsi
    ret
    
%ifidn __OUTPUT_FORMAT__,elf64
section .note.GNU-stack noalloc noexec nowrite progbits
%endif
