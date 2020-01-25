FROM  node:13.6.0-alpine3.11

RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/

COPY ./covfefe-flow-chatbot/ /usr/src/app/
RUN npm install --silent

CMD ["node", "src/server.js"]