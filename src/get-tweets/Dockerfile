FROM python:3.6.4-alpine3.7

RUN mkdir -p /get_tweets
WORKDIR /get_tweets

COPY ./src/requirements.txt /get_tweets

RUN pip install --no-cache-dir -r requirements.txt

COPY ./src/get_tweets.py /get_tweets

CMD ["python", "get_tweets.py", "6000"]