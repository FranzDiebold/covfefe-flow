from predict_client.prod_client import ProdClient

from util import get_vocabulary_and_dictionaries, vectorize_sentences, sample


IN_TENSOR_NAME = 'inputs'
IN_TENSOR_DTYPE = 'DT_FLOAT'
END_OF_TWEET = '\n'
TWEET_MAX_LEN: int = 280
DEFAULT_TEMPERATURE: float = 1.0


class TweetAutocompleter(object):
    def __init__(self, max_input_len: int,
                 host: str, port: int, model_name: str, model_version: int):
        self.max_input_len = max_input_len

        self.client = ProdClient('{host}:{port}'.format(host=host, port=port), model_name, model_version)

        _, self.char_to_id, self.id_to_char, self.vocabulary_size = get_vocabulary_and_dictionaries()

    def autocomplete(self, beginning_of_tweet: str, temperature: float = DEFAULT_TEMPERATURE) -> str:
        complete_tweet = beginning_of_tweet
        input_sentence = beginning_of_tweet
        for i in range(TWEET_MAX_LEN - len(beginning_of_tweet)):
            next_char = self._predict_next_char(input_sentence, temperature)
            if next_char == END_OF_TWEET:
                break

            complete_tweet += next_char
            input_sentence = input_sentence[1:] + next_char
        return complete_tweet

    def _predict_next_char(self, input_sentence: str, temperature: float) -> str:
        input_data = vectorize_sentences([input_sentence], self.max_input_len, self.vocabulary_size, self.char_to_id)
        request_data = [{
            'in_tensor_name': IN_TENSOR_NAME,
            'in_tensor_dtype': IN_TENSOR_DTYPE,
            'data': input_data.astype(int)
        }]
        response = self.client.predict(request_data)
        input_predictions = response['outputs'][0]

        next_index = sample(input_predictions, temperature)
        next_char = self.id_to_char[next_index]

        return next_char
