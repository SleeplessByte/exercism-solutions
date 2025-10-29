; Color Palette (Memory)

section .rodata
    global RED
    global GREEN
    global BLUE
  
       RED dd 0xFF000000
     GREEN dd 0x00FF0000
      BLUE dd 0x0000FF00

section .data ; mutable data
    global base_color

base_color dd 0xFFFFFF00
color_dest dq 0x0000000000000000

section .text

extern combining_function

global get_color_value
get_color_value:
    ; This function takes the address for a color as parameter
    ; - Address of a color ; rdi
    ; It must return the 32-bit value associated with the color
    mov eax, dword [rdi] ; this dereferences the address passed in
    ret

global add_base_color
add_base_color:
    ; This function takes the address for a color as parameter
    ; - Address of a color ; rdi
    ; It saves the 32-bit value associated with this color in the variable 'base_color'
    ; This variable must be accessible from other source files
    ; This function has no return value
    call get_color_value
    mov dword [rel base_color], eax
    ret

global make_color_combination
make_color_combination:
    ; This function takes the following parameters:
    ; - The address where the 32-bit value for the combined color should be stored. ; rdi
    ; - The address of a secondary color in the color table.                        ; rsi
    ; It should call 'combining_function' with the 32-bit value for base and secondary colors and store the result in the passed address
    ; This function has no return value

    ; First store the address in memory for later
    mov qword [rel color_dest], rdi 

    ; Combine color
    mov edi, dword [rel base_color]  ; get current 32-bit base color
    mov esi, dword [rsi]             ; get passed in 32-bit secondary color
    call combining_function
    
    ; Extract result
    mov r8, [rel color_dest]
    mov dword [r8], eax
    ret

%ifidn __OUTPUT_FORMAT__,elf64
section .note.GNU-stack noalloc noexec nowrite progbits
%endif
