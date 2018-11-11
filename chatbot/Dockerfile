FROM  node:10.13.0-alpine

RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/

COPY ./covfefe-flow-chatbot/ /usr/src/app/
RUN npm install --silent

CMD ["node", "src/server.js"]