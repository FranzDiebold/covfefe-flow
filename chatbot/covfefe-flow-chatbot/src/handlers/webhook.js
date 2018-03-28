'use strict';

const errors = require('restify-errors');

const createTweet = require('./generate-tweet');
const messagesUtil = require('../util/messages');

function handleRequest(req) {
    return new Promise((resolve, reject) => {
        if (req.body) {
            if (req.body.queryResult) {
                const action = (req.body.queryResult.action) ? req.body.queryResult.action : 'default';
                const queryText = req.body.queryResult.queryText || '';

                if (action === 'generate-tweet') {
                    createTweet(queryText)
                        .then((messages) => resolve(messagesUtil.getFulfillmentMessages(messages)))
                        .catch((error) => reject(error));
                }
            }
            else {
                reject(new errors.BadRequestError('Invalid webhook request: "queryResult" missing'));
            }
        }
        else {
            reject(new errors.BadRequestError('Invalid request: "body" missing.'));
        }
    });
}

module.exports = handleRequest;