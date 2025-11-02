; Poetry Club Door Policy (Strings)

section .odata
    politeness db `, please.`, 0

section .text

global front_door_response, front_door_password, back_door_response, back_door_password

front_door_response:
    ; This function takes the address in memory for a line of the poem as an argument. ; rdi
    ; It returns the first letter of that line, as a ASCII-encoded character.
    mov al, [rdi]
    ret

front_door_password:
    ; This function takes as argument the address in memory for a string containing the combined letters you found in task 1. ; rdi
    ; It must modify this string in-place, making it correctly capitalized.
    ; The function has no return value.
    
   call upcase_one      ; (there is no empty password)
   inc rdi              ; move memory by 1 byte
   cmp byte [rdi], `\0` ; check the next bye
   jne .downcase        ; break if last character
   ret  

.downcase:
    call downcase_one      
    inc rdi              ; move memory by 1 byte
    cmp byte [rdi], `\0` ; check the next bye
    jne .downcase
    
    ret

upcase_one:
  mov al, [rdi]
  cmp al, 0x61           ; check if already uppercase
  jb .skip               ; skip capitalization if already uppercase

  sub al, 32             ; upcase
  mov [rdi], al          ; write the character back to the memory

  .skip:
  ret

downcase_one:
  mov al, [rdi]
  cmp al, 0x61           ; check if already lower case
  jge .skip              ; skip capitalization if already lowercase

  add al, 32             ; downcase
  mov [rdi], al          ; write the character back to the memory

  .skip:
  ret

back_door_response:
    ; This function takes as argument the address in memory for a line of the poem. ; rdi
    ; It returns the last letter of that line that is not a whitespace character, as a ASCII-encoded character.
    
.store:
    cmp byte [rdi], 0x41 ; check if uppercase A
    jb .next
    cmp byte [rdi], 0x7A ; check if lowercase z
    jg .next

    mov al, [rdi]        ; store as return value
.next:
    inc rdi              ; move memory by 1 byte
    cmp byte [rdi], `\0` ; check the next bye
    jne .store
    
    ret

back_door_password:
    ; This function takes as arguments, in this order:
    ; 1. The address in memory for a buffer where the resulting string will be stored. ; rdi
    ; 2. The address in memory for a string containing the combined letters you found in task 3. ; rsi
    ; It should store the polite version of the capitalized password in the buffer.
    ; A polite version is correctly capitalized and has ", please." added at the end.
    ; The function has no return value.
    
    lea r8, [rdi]        ; store address of destination so I can "rewind"
    
.move:
    movsb                ; move one byte from rsi to rdi, inc. both
    cmp byte [rsi], `\0` ; check if next byte rsi is end of string
    jne .move

    movsb                ; move \0
    mov rdi, r8          ; rewind, then capitalize
    call front_door_password
    
    lea rsi, [rel politeness]
    mov rcx, 10          ; prepare to move 10 characters (bytes)
    rep movsb            ; move from rsi to rdi (1 byte * 10)
    
    ret

%ifidn __OUTPUT_FORMAT__,elf64
section .note.GNU-stack noalloc noexec nowrite progbits
%endif
