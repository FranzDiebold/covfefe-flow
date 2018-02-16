FROM tensorflow/tensorflow:1.5.0-py3

RUN mkdir -p /covfefe_flow
WORKDIR "/covfefe_flow"

COPY ./src /covfefe_flow

RUN pip install --no-cache-dir -r requirements.txt