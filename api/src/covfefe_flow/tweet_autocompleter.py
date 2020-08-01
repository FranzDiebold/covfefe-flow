"""TweetAutocompleter: autocomplete a given beginning of a tweet."""

import os
from zipfile import ZipFile

from tensorflow import keras
from google.cloud import storage, exceptions

from .util import get_vocabulary_and_dictionaries, vectorize_sentences, sample


BEGINNING_OF_TWEET_MAX_LENGTH = int(os.environ.get('BEGINNING_OF_TWEET_MAX_LENGTH', 50))
END_OF_TWEET = '\n'
TWEET_MAX_LEN = 280
DEFAULT_TEMPERATURE = 1.0
DEFAULT_MODEL_BUCKET_NAME = 'covfefe-flow-model-bucket'
BASE_FOLDER = '/tmp'


# pylint: disable=too-few-public-methods
class TweetAutocompleter():
    """Class for autocompleting tweets using an RNN."""
    def __init__(self, max_input_len: int, model_name: str):
        self.max_input_len = max_input_len

        loaded_model_path = self._load_model_files_from_storage(model_name)
        self.model = keras.models.load_model(loaded_model_path)

        _, self.char_to_id, self.id_to_char, self.vocabulary_size = \
            get_vocabulary_and_dictionaries()

    @classmethod
    def _load_model_files_from_storage(cls, model_name: str) -> None:
        storage_client = storage.Client()
        bucket_name = os.environ.get('MODEL_BUCKET_NAME', DEFAULT_MODEL_BUCKET_NAME)
        bucket = storage_client.bucket(bucket_name)
        model_zip_file_name = f'{model_name}.zip'
        model_zip_file_path = f'{BASE_FOLDER}/{model_zip_file_name}'
        blob_file = bucket.blob(model_zip_file_name)
        try:
            blob_file.download_to_filename(model_zip_file_path)
        except exceptions.NotFound:
            raise ValueError(f'Model "{model_name}" not found.')
        extracted_file_path = f'{BASE_FOLDER}/{model_name}'
        with ZipFile(model_zip_file_path, 'r') as model_zip_file:
            model_zip_file.extractall(extracted_file_path)
        return extracted_file_path

    def autocomplete(self,
                     beginning_of_tweet: str,
                     temperature: float = DEFAULT_TEMPERATURE
                    ) -> str:
        """Autocomplete a given beginning of a tweet."""
        if len(beginning_of_tweet) > BEGINNING_OF_TWEET_MAX_LENGTH:
            raise ValueError(f'The maximum length of "beginning_of_tweet" ' \
                             f'is {BEGINNING_OF_TWEET_MAX_LENGTH}.')

        if temperature <= 0 or temperature > 1.2:
            raise ValueError('Value for "temperature" must be in interval (0.0, 1.2].')

        complete_tweet = beginning_of_tweet
        input_sentence = beginning_of_tweet
        for _ in range(TWEET_MAX_LEN - len(beginning_of_tweet)):
            next_char = self._predict_next_char(input_sentence, temperature)
            if next_char == END_OF_TWEET:
                break

            complete_tweet += next_char
            input_sentence = input_sentence[1:] + next_char
        return complete_tweet

    def _predict_next_char(self, input_sentence: str, temperature: float) -> str:
        input_data = vectorize_sentences(
            [input_sentence],
            self.max_input_len,
            self.vocabulary_size,
            self.char_to_id
        )
        input_predictions = self.model.predict(input_data)[0]

        next_index = sample(input_predictions, temperature)
        next_char = self.id_to_char[next_index]

        return next_char
