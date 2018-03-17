<img src="../design/logo/covfefe-flow-logo.png" alt="covfefe-flow logo" style="max-width:100%;" width="400px" height="70px">

# :running: Train

Build and train the recurrent neural network (RNN) using the machine learning framework [TensorFlow](https://www.tensorflow.org) and the Python Deep Learning library [Keras](https://keras.io).
The Python visualization library [seaborn](https://seaborn.pydata.org) is used for visualizing .


## Procedure

The respective [Jupyter](http://jupyter.org) notebook with documentation can be found in

:fast_forward: [src/train-covfefe-flow.ipynb](src/train-covfefe-flow.ipynb).



## :rocket: Deployment & Usage
The official Python v3 [`tensorflow/tensorflow`](https://hub.docker.com/r/tensorflow/tensorflow/) Docker image is used (see [Dockerfile](./Dockerfile)), which runs [Jupyter](http://jupyter.org).

After starting the Docker container the Jupyter Notebook is running at:

[`http://192.168.99.100:8888/?token=<JUPYTER_TOKEN>`](http://192.168.99.100:8888/?token=<JUPYTER_TOKEN>)

(assuming that your Docker machine is listening at `192.168.99.100`)
