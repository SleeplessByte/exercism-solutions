; Secrets (Bit-manipulation)

section .data
    PRIVATE_KEY equ 0b1011_0011_0011_1100

section .text

; You should implement functions in the .text section
; A skeleton is provided for the first function

; the global directive makes a function visible to the test files
global extract_higher_bits
extract_higher_bits:
    ; This function takes one 16-bit integer as argument    ; di
    ; It returns the higher 8-bit value of the argument
    
    mov ax, di
    shr ax, 8
    ret

global extract_lower_bits
extract_lower_bits:
    ; This function takes one 16-bit integer as argument    ; di
    ; It returns the lower 8-bit value of the argument

    shl di, 8
    call extract_higher_bits
    ret

global extract_redundant_bits
extract_redundant_bits:
    ; This function takes one 16-bit integer as argument    ; di
    ; It returns a 8-bit integer with all bits set:
    ; - in both the lower and the higher 8 bits of the argument

    call extract_higher_bits
    mov bl, al

    call extract_lower_bits
    and al, bl
    ret

global set_message_bits
set_message_bits:
    ; This function takes one 16-bit integer as argument    ; di
    ; It returns a 8-bit integer with all bits set:
    ; - if they are set in the higher 8 bits of the argument,
    ; - the others unchanged

    call extract_higher_bits
    mov bl, al

    call extract_lower_bits
    or al, bl
    ret

global rotate_private_key
rotate_private_key:
    ; This function takes one 16-bit integer as argument    ; di
    ; It returns a 16-bit integer with bits of a private key 
    ; rotated to the left a number of positions equal to the
    ; redundant bits
    
    call extract_redundant_bits    ; find redundant bits
    movzx ax, al                   ; zero-extend answer to 16bits
    popcnt cx, ax                  ; count number of 1s

    mov ax, PRIVATE_KEY            ; get private key
    rol ax, cl                     ; rotate left by stored count
    ret

global format_private_key
format_private_key:
    ; This function takes one 16-bit integer as argument    ; di
    ; It returns a 8-bit integer with the private key fully 
    ; formatted after rotation
    ;
    ; To format a rotated private key, you must:
    ; - Isolate the lowest 8-bit portion of the rotated private key, which is the base value.
    ; - Isolate the highest 8-bit portion of the rotated private key, which is a mask to be applied to the base value.
    ; - Flip set bits in the base value that are also set in the mask.
    ; - Flip all bits in the result.
    
    call rotate_private_key        ; rotate the input
    
    mov di, ax
    call extract_higher_bits       ; get the mask
    mov bl, al
    call extract_lower_bits        ; get the base value
    
    xor al, bl                     ; flip what's set in both
    not al                         ; flip it
    ret

global decrypt_message
decrypt_message:
    ; This function takes one 16-bit integer as argument    ; di
    ; It returns a 16-bit integer, of which:
    ; - The higher 8 bits are the formatted private key.
    ; - The lower 8 bits are the message with all bits set

    mov r8w, di                   ; store original input
    call format_private_key       ; get private key
    mov r9b, al                   ; store private key

    mov di, r8w                   ; prepare set bits
    call set_message_bits          

    ; Combine the two
    movzx ax, al                  ; zero-fill output on the left (high)
    shl r9w, 8                    ; shift left private key (left fill)
    or ax, r9w                    ; combine
    ret

%ifidn __OUTPUT_FORMAT__,elf64
section .note.GNU-stack noalloc noexec nowrite progbits
%endif
