import string
import numpy as np


def get_vocabulary_and_dictionaries():
    printable_chars = [char for char in string.printable if char not in ('\t', '\r', '\x0b', '\x0c')]
    extra_chars = ['✅', '🏆', '📈', '📉', '🎥', '💰', '📸', '…']
    vocabulary = sorted(printable_chars + extra_chars)
    char_to_id = dict((char, i + 1) for i, char in enumerate(vocabulary))
    char_to_id[''] = 0
    id_to_char = dict((char_to_id[char], char) for char in char_to_id)
    vocabulary_size = len(char_to_id)
    return vocabulary, char_to_id, id_to_char, vocabulary_size


def sample(input_predictions, temperature=1.0):
    predictions = np.asarray(input_predictions).astype('float64')
    exp_predictions = np.exp(np.log(predictions) / temperature)
    normalized_predictions = exp_predictions / np.sum(exp_predictions)
    probabilities = np.random.multinomial(1, normalized_predictions, 1)
    return np.argmax(probabilities)
