<img src="../design/logo/covfefe-flow-logo.png" alt="covfefe-flow logo" style="max-width:100%;" width="400px" height="70px">

# API

[![CI/CD status badge](https://github.com/FranzDiebold/covfefe-flow/workflows/CI/CD/badge.svg)](https://github.com/FranzDiebold/covfefe-flow/actions?query=workflow%3ACI%2FCD)
![Python: v3.8](https://img.shields.io/badge/Python-v3.8-%234584b6.svg)
[![license: MIT](https://img.shields.io/badge/license-MIT-brightgreen.svg)](../LICENSE)

JSON API for autocompleting fake tweets using the Python web micro framework [Flask](https://github.com/pallets/flask/).

## API endpoints

### autocomplete

Autocomplete a fake tweet with a given beginning.

**Request**:

`POST` with a JSON encoded body containing the following parameters:

- `beginning_of_tweet`: The beginning of the tweet, up to 50 characters long.
- `temperature` (optional): Float value in the interval `(0.0, 1.2]` to control the randomness of predictions. The default value is `1.0`.

```json
{
  "beginning_of_tweet": "<Your_beginning_of_tweet_here>",
  "temperature": "0.9"
}
```

**Response**:

```json
{
    "beginning_of_tweet": "...",
    "temperature": "0.9",
    "generated_tweet": "... ...",
    "timestamp": "2020-03-14T01:59:26.535897"
}
```

#### Environment variables

The following environment variables may be set to configure the API:

| Variable name                   | Description                                                                  | Default value               |
|---------------------------------|------------------------------------------------------------------------------|-----------------------------|
| `MODEL_BUCKET_NAME`             | Name of the Google Cloud Storage bucket where the Tensorflow model is saved. | `covfefe-flow-model-bucket` |
| `MODEL_NAME`                    | Name of the TensorFlow model.                                                | `covfefe-flow`              |
| `BEGINNING_OF_TWEET_MAX_LENGTH` | Maximum length of the beginning of the tweet.                                | `50`                        |

## Deployment

The code may be deployed to [Google Cloud Functions](https://cloud.google.com/functions).
The TensorFlow model is stored in a [Google Cloud Storage](https://cloud.google.com/) bucket.
