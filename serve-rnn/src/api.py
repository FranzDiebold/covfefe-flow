from datetime import datetime
import json

import falcon
from falcon.errors import HTTPInvalidParam

from tweet_autocompleter import TweetAutocompleter


BEGINNING_OF_TWEET_MAX_LENGTH = 25
TENSORFLOW_SERVING_HOST = 'tensorflow-serving'
TENSORFLOW_SERVING_PORT = 9000
TENSORFLOW_SERVING_MODEL_NAME = 'covfefe-flow'
TENSORFLOW_SERVING_MODEL_VERSION = 1


class TweetAutocompleterResource(object):
    def on_post(self, req, resp):
        # may raise HTTPMissingParam
        beginning_of_tweet = req.get_param('beginning_of_tweet', required=True)

        if len(beginning_of_tweet) > BEGINNING_OF_TWEET_MAX_LENGTH:
            raise HTTPInvalidParam('The maximum length of "beginning_of_tweet" is %d.' % BEGINNING_OF_TWEET_MAX_LENGTH,
                                   'beginning_of_tweet')

        tweet_autocompleter = TweetAutocompleter(BEGINNING_OF_TWEET_MAX_LENGTH, 1.0,
                                                 TENSORFLOW_SERVING_HOST, TENSORFLOW_SERVING_PORT,
                                                 TENSORFLOW_SERVING_MODEL_NAME, TENSORFLOW_SERVING_MODEL_VERSION)
        generated_tweet = tweet_autocompleter.autocomplete(beginning_of_tweet)

        response_body = {
            'beginning_of_tweet': beginning_of_tweet,
            'generated_tweet': generated_tweet,
            'timestamp': datetime.now().isoformat()
        }
        resp.body = json.dumps(response_body)


app = falcon.API()
app.req_options.auto_parse_form_urlencoded = True

tweet_autocompleter_resource = TweetAutocompleterResource()

app.add_route('/', tweet_autocompleter_resource)
