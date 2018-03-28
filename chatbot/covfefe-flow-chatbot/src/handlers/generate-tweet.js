'use strict';

const clients = require('restify-clients');
const errors = require('restify-errors');

const config = require('../config');

const REQUEST_TIMEOUT = 5 * 1000;
const client = clients.createStringClient({
    url: config.apiHost,
    requestTimeout: REQUEST_TIMEOUT
});
const BEGINNING_OF_TWEET_MAX_LENGTH = process.env.BEGINNING_OF_TWEET_MAX_LENGTH;

function generateTweet(beginningOfTweet) {
    return new Promise((resolve, reject) => {
        let beginningOfTweetTruncated = false;
        if (beginningOfTweet.length > BEGINNING_OF_TWEET_MAX_LENGTH) {
            beginningOfTweetTruncated = true;
            beginningOfTweet = beginningOfTweet.substring(0, BEGINNING_OF_TWEET_MAX_LENGTH);
        }

        const postParams = {
            beginning_of_tweet: beginningOfTweet,
            temperature: 0.8
        };
        client.post('/', postParams, (err, req, res, obj) => {
            let messages;
            if (res.statusCode !== 200) {
                if (res.statusCode === 408) {
                    // 408: Request timeout
                    messages = ['Sorry.', '⏳', 'That took too long for me.'];
                }
                else {
                    messages = ['Hm...', 'Something went wrong.', '😢'];
                }
            }
            else {
                let parsedObj;
                try {
                    parsedObj = JSON.parse(obj);
                } catch (e) {
                    parsedObj = {};
                } 
                const generatedTweet = parsedObj.generated_tweet || undefined;
                if (generatedTweet) {
                    messages = [generatedTweet];
                    if (beginningOfTweetTruncated) {
                        messages.push(`(Your "beginning of tweet" was truncated to the maximum length of ${BEGINNING_OF_TWEET_MAX_LENGTH} characters.)`);
                    }
                }
                else {
                    messages = ['??'];
                }
            }

            resolve(messages);
        });
    });
}

function handleGenerateTweetRequest(queryText) {
    return new Promise((resolve, reject) => {
        generateTweet(queryText)
            .then((messages) => resolve(messages))
            .catch((error) => reject(error));
    });
}

module.exports = handleGenerateTweetRequest;