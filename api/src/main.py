"""Main API handler."""
# pylint: disable=invalid-name

import os
from typing import Tuple, Dict
from datetime import datetime

from flask import Request, Response, jsonify

from covfefe_flow.tweet_autocompleter import TweetAutocompleter, BEGINNING_OF_TWEET_MAX_LENGTH, \
    DEFAULT_TEMPERATURE


MODEL_NAME = os.environ.get('MODEL_NAME', 'covfefe-flow')

# The TweetAutocompleter is kept in a global variable in order to re-use it for warm invocations.
tweet_autocompleter = None


def handle(request: Request) -> Tuple[Response, int, Dict[str, str]]:
    """Handler for handling POST requests."""
    # pylint: disable=global-statement
    global tweet_autocompleter

    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '3600'
    }

    if request.method == 'OPTIONS':
        return Response(''), 204, headers

    if request.method != 'POST':
        return jsonify({'message': f'HTTP method "{request.method}" not allowed.'}), 405, headers

    request_json = request.get_json() or {}
    print(f'POST request {request_json}.')
    try:
        beginning_of_tweet = request_json['beginning_of_tweet']
    except KeyError:
        return jsonify({'message': 'Parameter "beginning_of_tweet" missing.'}), 400, headers

    try:
        temperature = float(request_json.get('temperature', DEFAULT_TEMPERATURE))
    except ValueError:
        return jsonify({'message': 'Float value expected for "temperature".'}), 400, headers

    if tweet_autocompleter is None:
        tweet_autocompleter = TweetAutocompleter(BEGINNING_OF_TWEET_MAX_LENGTH, MODEL_NAME)

    try:
        generated_tweet = tweet_autocompleter.autocomplete(beginning_of_tweet, temperature)
    except ValueError as err:
        return jsonify({'message': str(err)}), 400, headers

    response_body = {
        'beginning_of_tweet': beginning_of_tweet,
        'temperature': temperature,
        'generated_tweet': generated_tweet,
        'timestamp': datetime.now().isoformat()
    }

    return jsonify(response_body), 200, headers
