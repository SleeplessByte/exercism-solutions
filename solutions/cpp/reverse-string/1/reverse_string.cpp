#include "reverse_string.h"

#include <algorithm> 
#include <iostream>
#include <string>

namespace reverse_string {
    std::string reverse_string(std::string str) {
        reverse(str.begin(), str.end()); 
        return str;
    }
}  // namespace reverse_string
