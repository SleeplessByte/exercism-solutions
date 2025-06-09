import re

SILENCE = re.compile('^\s*$')
SHOUTING = re.compile('^[^A-Za-z]*[A-Z]+(?:[^a-z]*)$')
ASKING = re.compile('.*\?\s*$')

def response(message):
    if SILENCE.match(message) is not None:
        return 'Fine. Be that way!'
    
    if SHOUTING.match(message) is not None:
        return "Calm down, I know what I'm doing!" if ASKING.match(message) is not None else 'Whoa, chill out!'

    return 'Sure.' if ASKING.match(message) is not None else 'Whatever.'
