'use strict';

function getFulfillmentMessages(messages) {
    return {
        fulfillmentMessages: (messages || []).map((message) => {
            return {
                text: {
                    text: [
                        message
                    ]
                }
            };
        })
    };
}

module.exports = {
    getFulfillmentMessages: getFulfillmentMessages
};