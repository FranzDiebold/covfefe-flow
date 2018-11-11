FROM python:3.7.1-alpine3.8

RUN mkdir -p /get_tweets
WORKDIR /get_tweets

COPY ./src/requirements.txt /get_tweets

RUN pip install --no-cache-dir -r requirements.txt

COPY ./src/get_tweets.py /get_tweets

CMD ["python", "get_tweets.py", "6000"]