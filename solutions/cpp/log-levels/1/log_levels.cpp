#include <string>

namespace log_line {
    std::string message(std::string log_line) {
        int location = log_line.find(":") + 2;
        return log_line.substr(location);
    }

    std::string log_level(std::string log_line) {
        int location = log_line.find(":") - 2;
        return log_line.substr(1, location);
    }

   std::string reformat(std::string log_line) {
       return message(log_line) + " (" + log_level(log_line) + ")";
   }
} // namespace log_line
