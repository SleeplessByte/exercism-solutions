; Bird Watcher (Arrays)

section .data
   last_bird_counts db 0, 2, 5, 3, 7, 8, 4, 0
   next_bird_counts db 0, 0, 0, 0, 0, 0, 0, 0
          day_index dq 0
   
section .text

global last_week_counts
last_week_counts:
    ; This function takes no parameter
    ; It returns a copy of last week's counts as a 8-byte number
    ; At the start of the program, last week's counts are 0, 2, 5, 3, 7, 8 and 4
    ; The last byte of the return value is always zero
    
    lea rcx, [rel last_bird_counts]
    mov rax, qword [rcx] 
    ret

global current_week_counts
current_week_counts:
    ; This function takes no parameter
    ; It returns two values:
    ; - A copy of current week's counts as a 8-byte number.
    ; - The number of days already filled in the current week, as a 8-byte number.
    ; All days after the most recent one should have its corresponding byte zeroed-out in the output
    ; At the start of the program, there is no count for the current week
    lea rcx, [rel next_bird_counts]
    mov rax, qword [rcx] 

    lea rcx, [rel day_index]
    mov rdx, qword [rcx]
    ret 

global save_count
save_count:
    ; This function takes as parameter the most recent count, as a 1-byte number ; di(l)
    ; It must save this value in a new entry for the current week
    ; If there is already 7 entries in the current week before the function is called, then:
    ; - The current week becomes the last week.
    ; - A new entry is added with the passed value in a new current week.
    ; The function has no return value

    mov rdx, [rel day_index]         ; find current index
    cmp rdx, 7                       ; if day index >= 7
    jae save_count.swap              ; ..., then 7+ values are stored
    jmp save_count.store
    ret
    
.swap:
    mov r8, qword [rel next_bird_counts]   ; get current week count as single number
    mov qword [rel last_bird_counts], r8   ; store r8 as last week count
    mov qword [rel next_bird_counts], 0x0  ; clear array
    mov qword [rel day_index], 0x0          ; clear day index
    jmp save_count.store
    ret
    
.store:
    mov rdx, [rel day_index]         ; find current index
    lea rcx, [rel next_bird_counts]  ; find address of first index

    mov [rcx + rdx], dil           ; store incoming byte at location
    inc qword [rel day_index]         ; add one to the count
    ret

global today_count
today_count:
    ; This function has no parameter
    ; It returns the most recent entry for the current week, as a 1-byte number
    mov rdx, [rel day_index]         ; find current index
    dec rdx                          ; look at last counted day
    lea rcx, [rel next_bird_counts]  ; find address of first index

    mov al, byte [rcx + rdx]       ; retrieve byte at location
    ret
    
global update_today_count
update_today_count:
    ; This function takes as parameter a 1-byte number ; di(l)
    ; It adds this number to the most recent entry for the current week
    ; This function has no return value

    mov rdx, [rel day_index]         ; find current index
    dec rdx                          ; look at last counted day
    lea rcx, [rel next_bird_counts]  ; find address of first index

    add [rcx + rdx], dil            ; store updated count
    
    ret

global update_week_counts
update_week_counts:
    ; This function takes as parameter a 8-byte number ; rdi
    ; Each byte in the input parameter, but the last, represents a day's count in the current week
    ; The last byte in the input parameter has no meaning and must be zeroed-out
    ; This function makes the following changes:
    ; - The current week becomes the last week.
    ; - The counts in the input parameter are fully inserted in the current week.
    
    mov r8, qword [rel next_bird_counts]   ; get current week count as single number
    mov qword [rel last_bird_counts], r8   ; store r8 as last week count
    mov qword [rel next_bird_counts], rdi  ; set array
    mov byte [rel next_bird_counts + 7], 0 ; clear last byte
    mov qword [rel day_index], 7           ; set day index
    
    ret
 
%ifidn __OUTPUT_FORMAT__,elf64
section .note.GNU-stack noalloc noexec nowrite progbits
%endif
