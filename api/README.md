<img src="../design/logo/covfefe-flow-logo.png" alt="covfefe-flow logo" style="max-width:100%;" width="400px" height="70px">

# API

[![Python: v3.6.4](https://img.shields.io/badge/Python-v3.6.4-%234584b6.svg)](./Dockerfile)

JSON-API for generating fake tweets using the Python web API framework [Falcon](https://github.com/falconry/falcon).


## API endpoints

### generate
Generate a fake tweet with a given beginning.

**Request**

`POST` `https://api.covfefe-flow.ml/` with a `x-www-form-urlencoded` body containing the following parameters:
- `beginning_of_tweet`: The beginning of the tweet, up to 35 characters long.
- `temperature` (optional): Float value in the interval (0.0, 1.2] to control the randomness of predictions.


**Response**
:
```json
{
    "beginning_of_tweet": "...",
    "generated_tweet": "... ...",
    "timestamp": "2018-03-14T01:59:26.535897"
}
```



## Deployment
The app is deployed using Docker ([Dockerfile](./Dockerfile)).
The Falcon application is running in a [Gunicorn WSGI server](https://github.com/benoitc/gunicorn) in a Docker container named `api`.