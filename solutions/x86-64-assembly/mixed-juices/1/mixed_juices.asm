; Mixed Juices (Loops)

section .odata
    time_to_juice db 1, 3, 3, 4, 5, 4, 7, 10
          LIME_S equ 'S'
          LIME_M equ 'M'
          LIME_L equ 'L'

section .text

global time_to_make_juice
time_to_make_juice:
    ; This function has one argument, the ID for a juice as a 32-bit number           ; edi
    ; It returns the time to prepare this juice, as a 32-bit number
    lea r8, [rel time_to_juice]    ; get memory of first item
    add r8, rdi                    ; move to next byte * id
    dec r8                         ; ID is 1-indexed, array is 0-indexed
    
    mov al, byte [r8]              ; retrieve time to juice
    movzx eax, al                  ; ensure 32-bit number
    ret

global time_to_prepare
time_to_prepare:
    ; This function has two arguments:
    ; - An array with the IDs for ordered juices, each ID a 32-bit number             ; rdi
    ; - The number of ordered juices, also a 32-bit number.                           ; esi
    ; It returns the total time to prepare all ordered juices, as a 32-bit number

    mov ecx, esi                     ; loop this many times
    mov r9d, 0                       ; store the sum (0 initially)
    lea r10, [rdi]                   ; store the array start (input ordered juices)

.juice:
    mov edi, dword [r10 + 4*rcx - 4] ; get the ID of the current juice
    
    call time_to_make_juice          ; get the time to juice
    add r9d, eax                     ; add to sum
    loop .juice                      ; repeat until rcx is 0
    
    mov eax, r9d                     ; return the sum
    ret

lime_wedges:
    ; - Takes one input parameter: 8-bit number        ; dil
    ; Returns the number of wedges as 32-bit number

    cmp dil, LIME_S
    je .small
    cmp dil, LIME_M
    je .medium

    mov eax, 10
    ret
.small:
    mov eax, 6
    ret
.medium:
    mov eax, 8
    ret

global limes_to_cut
limes_to_cut:
    ; This function takes three arguments:
    ; - The number of wedges needed.                                                  ; edi
    ; - An array with the current supply of limes, each represented by a 8-bit number.; rsi
    ; - The number of limes in the supply, as a 32-bit number.                        ; edx
    ; It returns the number of limes that need to be cut, as a 32-bit number
    
    mov ecx, edx     ; loop this many times (at most amount of lime times)
    
    lea r8, [rsi]    ; store index of first lime to cut
    mov r9, 0        ; track lime index (cut count)
    mov r10d, edi    ; track count still needed

    cmp ecx, 0       ; if there is nothing to cut, break
    je .break
    
.loop:
    cmp r10d, 0      ; if there is nothing left to cut, break
    jle .break

    mov dil, byte [r8 + 1*r9]    ; get lime at index
    call lime_wedges             ; get wedges for lime
    sub r10d, eax                ; subtract cut wedges

    inc r9b          ; move lime index +1
    loop .loop
.break:
    mov eax, r9d     ; return the count (lime index)
    ret

global remaining_orders
remaining_orders:
    ; This function takes two arguments:
    ; - The time left in the shift.                                                   ; edi
    ; - An array with the IDs for ordered juices still not prepared, each ID a 32-bit number. ; rsi
    ; It returns the number of juices made before the shift ends, as a 32-bit number.
    ; You may consider that:
    ; - The array is never empty.
    ; - The time left in the shift at the beginning is always greater than 0.
    ; - There are more orders in the array than that which can be prepared before the shift ends.

    lea r9, [rsi]    ; store index of first drink to make
    mov r10, 0       ; track drink index
    mov r11d, edi    ; track time left

.loop:
    mov edi, dword [r9 + 4*r10]   ; prepare juicing
    call time_to_make_juice
    
    sub r11d, eax    ; subtract time passed
    inc r10          ; move drink index +1
   
    cmp r11d, 0      ; if out of time
    jle .handover    ; ...handover
   
    jmp .loop

.handover:
    mov eax, r10d    ; return the count (drink index)
    ret

%ifidn __OUTPUT_FORMAT__,elf64
section .note.GNU-stack noalloc noexec nowrite progbits
%endif
