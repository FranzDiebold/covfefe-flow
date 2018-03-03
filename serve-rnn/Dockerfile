FROM python:3.6.4-slim

# install git
RUN apt-get update
RUN apt-get install -y git-core

RUN mkdir -p /serve_rnn
WORKDIR /serve_rnn

COPY . /serve_rnn/

RUN pip install --no-cache-dir -r requirements.txt

CMD ["gunicorn", "-c", "gunicorn_conf.py", "--chdir", "src", "api:app", "--reload"]