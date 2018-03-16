<img src="../design/logo/covfefe-flow-logo.png" alt="covfefe-flow logo" style="max-width:100%;" width="400px" height="70px">

# :running: Train

Build and train the recurrent neural network (RNN) using the machine learning framework [TensorFlow](https://www.tensorflow.org) and the Python Deep Learning library [Keras](https://keras.io).
The Python visualization library [seaborn](https://seaborn.pydata.org) is used for visualizing .


## Procedure

The respective [Jupyter](http://jupyter.org) notebook can be found in [src/train-covfefe-flow.ipynb](src/train-covfefe-flow.ipynb).

### Preparations
...


### Data loading
Load tweets from [src/data/tweets.txt](./src/data/tweets.txt).


### Data cleaning & data preparation
- HTML decoding (particularly `&amp;`) using the Python library [Beautiful Soup](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)
- unify characters such as `'`, `"` and `-`
- limit characters to vocabulary


### Data exploration
...


### Build model
- [LSTM](https://keras.io/layers/recurrent/#lstm): Long short-term memory
- Regularization: to counteract overfitting
- Dropout: to counteract overfitting


### Train model
[ReduceLROnPlateau](https://keras.io/callbacks/#reducelronplateau): really great way to adjust (reduce) the learning rate when the validation loss stops improving


#### :chart_with_downwards_trend: TensorBoard
[TensorBoard](https://github.com/tensorflow/tensorboard) is used for visualizing the learning progress.
It needs to be started within the Docker container:

```bash
docker exec -it src_train_1 bash
```

And in the container:
```bash
tensorboard --logdir "logs"
```



## :rocket: Deployment & Usage
The official Python v3 [`tensorflow/tensorflow`](https://hub.docker.com/r/tensorflow/tensorflow/) Docker image is used (see [Dockerfile](./Dockerfile)), which runs [Jupyter](http://jupyter.org).

After starting the Docker container the Jupyter Notebook is running at:

[`http://192.168.99.100:8888/?token=<JUPYTER_TOKEN>`](http://192.168.99.100:8888/?token=<JUPYTER_TOKEN>)

(assuming that your Docker machine is listening at `192.168.99.100`)


### [Google Colaboratory](https://colab.research.google.com)
