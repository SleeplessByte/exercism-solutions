; Inventory Management

EMPTY_BOX_WEIGHT equ 500
TRUCK_INTERIOR_HEIGHT equ 300
PAYMENT_PER_BOX equ 5
PAYMENT_PER_TRIP equ 220

section .text

global get_box_weight
get_box_weight:
    ; This function takes the following parameters:
    ; - The number of items for the first product in the box       ; di
    ; - The weight of each item of the first product, in grams     ; si
    ; - The number of items for the second product in the box      ; dx
    ; - The weight of each item of the second product, in grams    ; cx
    ; The function must return the total weight of a box, in grams ; ret

    ; Multiply the second product count and weight;
    movzx eax, dx ; lower 16 bits of dx, upper bits are cleared
    movzx ecx, cx ; lower 16 bits of cx, upper bits are cleared
    mul ecx       ; result should now be in eax

    ; Store temporarily
    mov ebx, eax

    ; Multiply the first product count and weight;
    movzx eax, di ; lower 16 bits of di, upper bits are cleared
    movzx ecx, si ; lower 16 bits of si, upper bits are cleared
    mul ecx       ; result should now be in eax

    ; Sum the two results with the empty box weight
    add eax, ebx
    add eax, EMPTY_BOX_WEIGHT
    ret

global max_number_of_boxes
max_number_of_boxes:
    ; This function takes the following parameters: 
    ; - This function takes the height of the box, in centimeters, as parameter; di(l)
    ; It must return how many boxes can be stacked vertically

    ; Move dividend into register for division, then divide
    mov ax, TRUCK_INTERIOR_HEIGHT
    div dil; first parameter
    
    ret

global items_to_be_moved
items_to_be_moved: 
    ; This function takes the following parameters:    
    ; - The number of items still unaccounted for a product ; edi
    ; - The number of items for the product in a box        ; esi
    ; The function must return how many items remain to be moved, after counting those in the box

    sub edi, esi
    mov eax, edi
    ret

global calculate_payment
calculate_payment:
    ; This function takes the following parameters:
    ; - The upfront payment                ; rdi
    ; - The total number of boxes moved    ; esi
    ; - The number of truck trips made     ; edx
    ; - The number of lost items           ; ecx
    ; - The value of each lost item        ; r8
    ; - The number of other workers to split the payment/debt with you ; r9b
    ; The function must return how much you should be paid, or pay, at the end


    ; Calculate trip payments
    mov rax, PAYMENT_PER_TRIP    ; per trip
    mul rdx                      ; multiply with trip count, result should now be in rax
    mov r11, rax                 ; temporarily store in r11

    ; Calculate box payments
    mov rax, PAYMENT_PER_BOX     ; per box
    mul rsi                      ; multiply with box count, result should now be in rax
    mov r12, rax                 ; temporarily store in r12
    
    ; Calculate expected lost boxes 
    mov rax, r8                  ; lost value per item    
    mul rcx                      ; multiply with count items, result should now be in rax
    mov r10, rax                 ; temporarily store in r10

    ; Calculate payment left by
    ; 1. Taking 0 to be paid               ;
    ; 2. Adding trip payment to be paid    ; eg. 1100
    ; 3. Adding box payment to be paid     ; eg. 5000
    ; 4. Subtracting lost and damaged      ; eg. 42
    ; 5. Subtracting made payment          ; eg. 2000

    mov rax, 0    ; 0
    add rax, r11  ; 0 + 1100
    add rax, r12  ; 0 + 1100 + 5000
    sub rax, r10  ; 0 + 1100 + 5000 - 42
    sub rax, rdi  ; 0 + 1100 + 5000 - 42 - 2000

    ; Now how much does everyone get?
    add r9, 1          ; add me to total count of people
    movzx r9, r9b      ; zero-fill people count to 64 bits
    cqo                ; extend sign from rax to rdx
    idiv r9            ; divide
    add rax, rdx       ; add remainder to result

    ; Move answer to return value
    ret
    
    
%ifidn __OUTPUT_FORMAT__,elf64
section .note.GNU-stack noalloc noexec nowrite progbits
%endif
