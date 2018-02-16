import os
import sys
import twitter
import logging


consumer_key = os.environ.get('TWITTER_CONSUMER_KEY')
consumer_secret = os.environ.get('TWITTER_CONSUMER_SECRET')
access_token_key = os.environ.get('TWITTER_ACCESS_TOKEN_KEY')
access_token_secret = os.environ.get('TWITTER_ACCESS_TOKEN_SECRET')
screen_name = os.environ.get('TWITTER_SCREEN_NAME')

BATCH_SIZE = 200
DEFAULT_NUMBER_OF_TWEETS = 200
TWEETS_FOLDER = 'tweets'

logger = logging.getLogger('get-tweets')


def get_tweets(consumer_key, consumer_secret, access_token_key, access_token_secret,
               screen_name, number_of_tweets):
    logger.warning('Getting %d tweets...' % number_of_tweets)

    api = twitter.Api(
        consumer_key=consumer_key,
        consumer_secret=consumer_secret,
        access_token_key=access_token_key,
        access_token_secret=access_token_secret,
        tweet_mode='extended',
    )

    max_id = 0

    tweets = []
    while len(tweets) < number_of_tweets:
        statuses = api.GetUserTimeline(
            screen_name=screen_name,
            max_id=max_id,
            count=BATCH_SIZE,
            include_rts=False,
        )
        if len(statuses) == 0:
            break
        tweets.extend(list(map(lambda status: status.full_text, statuses)))
        max_id = statuses[-1].id - 1
        logger.warning('Max Tweet id: %d' % max_id)

    return tweets[:number_of_tweets]


def _prepare_tweet(tweet):
    return '{}\n'.format(tweet.replace('\n', '\\n'))


def write_tweets_to_file(tweets):
    logger.warning('Writing %d tweets to file...' % len(tweets))
    with open('%s/tweets.txt' % TWEETS_FOLDER, 'w') as f:
        f.writelines(map(_prepare_tweet, tweets))


def get_and_write_tweets_to_file(consumer_key, consumer_secret, access_token_key, access_token_secret,
                                 screen_name, number_of_tweets):
    tweets = get_tweets(consumer_key, consumer_secret, access_token_key, access_token_secret,
                        screen_name, number_of_tweets)
    write_tweets_to_file(tweets)


if __name__ == '__main__':
    try:
        number_of_tweets = int(sys.argv[1])
    except:
        number_of_tweets = DEFAULT_NUMBER_OF_TWEETS

    get_and_write_tweets_to_file(consumer_key, consumer_secret, access_token_key, access_token_secret,
                                 screen_name, number_of_tweets)
    logger.warning('Done!')
