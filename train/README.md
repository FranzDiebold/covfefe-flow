<img src="../design/logo/covfefe-flow-logo.png" alt="covfefe-flow logo" style="max-width:100%;" width="400px" height="70px">

# :running: Train

Using the machine learning framework [TensorFlow](https://www.tensorflow.org) and the Python Deep Learning library [Keras](https://keras.io).

- [LSTM](https://keras.io/layers/recurrent/#lstm)
- [ReduceLROnPlateau](https://keras.io/callbacks/#reducelronplateau)
- Regularization
- Dropout


### :chart_with_downwards_trend: TensorBoard
[TensorBoard](https://github.com/tensorflow/tensorboard) is used for visualizing the learning progress.
It needs to be started within the Docker container:

```bash
docker exec -it src_train_1 bash
```

And in the container:
```bash
tensorboard --logdir "logs"
```
