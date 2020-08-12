<img src="../design/logo/covfefe-flow-logo.png" alt="covfefe-flow logo" style="max-width:100%;" width="400px" height="70px">

# Train

![TensorFlow: v2.3](https://img.shields.io/badge/TensorFlow-v2.3-ff6f00)

Build and train the recurrent neural network (RNN) using the machine learning framework [TensorFlow](https://www.tensorflow.org).
The RNN is **character based**, in order to stimulate [neologisms](https://en.wikipedia.org/wiki/Neologism) - just like *covfefe* :yum:.

### Used TensorFlow features / libraries

- [Keras](https://keras.io), the Python deep learning API on top of TensorFlow
- [tf.data](https://www.tensorflow.org/guide/data), to build custom input pipelines
- [TensorFlow Lite](https://www.tensorflow.org/lite) for fast inference
- [seaborn](https://seaborn.pydata.org), the Python visualization library

## Data

All @realDonaldTrump tweets can be downloaded at [trumptwitterarchive.com](http://www.trumptwitterarchive.com/archive).

## Jupyter Notebook

<a href="https://colab.research.google.com/github/FranzDiebold/covfefe-flow/blob/primary/train/src/train-covfefe-flow.ipynb" target="_blank">
  <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>

The respective [Jupyter](http://jupyter.org) notebook with documentation can be found in

[src/train-covfefe-flow.ipynb](src/train-covfefe-flow.ipynb).
