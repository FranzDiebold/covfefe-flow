<img src="../design/logo/covfefe-flow-logo.png" alt="covfefe-flow logo" style="max-width:100%;" width="400px" height="70px">

# :speech_balloon: Chatbot

<a href="http://t.me/covfefeflow_bot" target="_blank"><img src="https://img.shields.io/badge/chat-Telegram-32afed.svg" alt="chat: Telegram"></a>
<a href="https://bot.dialogflow.com/covfefe-flow" target="_blank"><img src="https://img.shields.io/badge/chat-Web-ed6c1f.svg" alt="chat: Web"></a>
[![license: MIT](https://img.shields.io/badge/license-MIT-brightgreen.svg)](./LICENSE.md)

covfefe-flow chatbot is the backend API for the **chatbot** for the covfefe-flow app. It is a [Node.js](https://nodejs.org) app using the following packages:
- [restify](https://github.com/restify/node-restify) for providing the RESTful interface.
- [restify-clients](https://github.com/restify/clients) for making requests to the covfefe-fow [generateTweet API](../api).
- [restify-errors](https://github.com/restify/errors) for handling HTTP errors.

For handling the natural language processing (NLP) and the connections to the numerous chat services ([Facebook Messenger](https://www.messenger.com), [Slack](https://slack.com), [Telegram](https://telegram.org), [Skype](https://www.skype.com)) the [Dialogflow](https://dialogflow.com) platform is used.



## [Dialogflow](https://dialogflow.com)

The exported Dialogflow agent `covfefe-flow` can be found in [/dialogflow-agent](./dialogflow-agent). It can also be used for re-import as ZIP-file in Dialogflow (in agent settings → `Export and Import` → `IMPORT FROM ZIP`).

### Intents, Actions & Parameters
The following intents, [actions and parameters](https://dialogflow.com/docs/actions-and-parameters) are defined in Dialogflow:
- `Default Fallback Intent` with the `generate-tweet` action for fake tweet generation. No parameters are used since the complete message (`queryText`) is used as beginning of the tweet.



## :dart: API endpoint
In order to comply with the requirements of the Dialogflow [webhook](https://dialogflow.com/docs/fulfillment) (v2) the following API endpoint is defined:

### webhook

**[Request](https://dialogflow.com/docs/reference/api-v2/rest/v2beta1/WebhookRequest)**

`POST` `https://chatbot.covfefe-flow.ml/`

With the body:
```json
{
    "session": '<...>',
    "responseId": '<...>',
    "queryResult": {
        "queryText": "<BEGINNING_OF_TWEET>",
        "action": "generate-tweet",
        "parameters": {},
        ...
    },
    "originalDetectIntentRequest": {
        ...
    },
}
```

**[Response](https://dialogflow.com/docs/reference/api-v2/rest/v2beta1/WebhookResponse)**

```json
{
  "fulfillmentMessages": [
        {
            "text": {
                "text": [
                    "<GENERATED_TWEET>"
                ]
            }
        }
    ]
}
```



## 🎛 Configuration
In [`src/config.js`](./covfefe-flow-chatbot/src/config.js) you may change the `apiHost` of the corresponding backend:
```js
config.apiHost = 'http://api:8000';
```
Please keep in mind that the API host is reachable within the Docker host.



## :rocket: Deployment
The app is deployed using Docker ([Dockerfile](./Dockerfile)).