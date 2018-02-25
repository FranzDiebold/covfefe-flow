# covfefe-flow

![work: in progress](https://img.shields.io/badge/work-in_progress-blue.svg)
[![license: MIT](https://img.shields.io/badge/license-MIT-brightgreen.svg)](./LICENSE.md)

Donald Trump tweet generator 🤖

<img src="./images/readme/cofveve-tweet_screenshot.jpg" width="60%" style="max-width:100%;" alt="covfefe tweet screenshot">

> Despite the constant negative press covfefe

[original (deleted) tweet](https://archive.is/f7UL3)



## Architecture

### Get tweets
Possible sources:
- [Twitter API](https://developer.twitter.com/en/docs)
- [http://www.trumptwitterarchive.com/archive](http://www.trumptwitterarchive.com/archive)


### Train RNN
Using the machine learning framework [TensorFlow](https://www.tensorflow.org) and the Python Deep Learning library [Keras](https://keras.io).
LSTM


#### TensorBoard

[TensorBoard](https://github.com/tensorflow/tensorboard) is used for visualizing the learning progress.
It needs to be started within the Docker container:

```bash
docker exec -it src_train-rnn_1 bash
```

And in the container:
```bash
tensorboard --logdir "logs"
```


### TensorFlow Serving
[TensorFlow Serving](https://www.tensorflow.org/serving/)

[epigramai/model-server]



### Serve RNN
JSON-API



### Chatbot
TODO


## Deployment
Using [deployment shell scripts](./src/deployment)...
