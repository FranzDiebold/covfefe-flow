import string
from typing import List, Dict
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


def vectorize_sentences(sentences: List[str], maxlen: int, vocabulary_size: int,
                        char_to_id: Dict[str, int]) -> np.ndarray:
    vectorized_sentences = np.zeros((len(sentences), maxlen, vocabulary_size), dtype=np.bool)
    for i, sentence in enumerate(sentences):
        index_offset = maxlen - len(sentence)
        for t, char in enumerate(sentence):
            vectorized_sentences[i, index_offset + t, char_to_id[char]] = 1
    return vectorized_sentences


def sample(input_predictions, temperature=1.0):
    predictions = np.asarray(input_predictions).astype('float64')
    exp_predictions = np.exp(np.log(predictions) / temperature)
    normalized_predictions = exp_predictions / np.sum(exp_predictions)
    probabilities = np.random.multinomial(1, normalized_predictions, 1)
    return np.argmax(probabilities)
