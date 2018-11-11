### STAGE 1: Build ###

FROM node:10.13.0-alpine as builder

COPY covfefe-flow/package.json ./

RUN npm install && mkdir /ng-app && cp -R ./node_modules ./ng-app

WORKDIR /ng-app

COPY covfefe-flow/ .

RUN $(npm bin)/ng build --prod



### STAGE 2: Setup ###

FROM nginx:1.15.6-alpine

RUN rm -f /etc/nginx/sites-enabled/default
COPY nginx.conf /etc/nginx/nginx.conf

# Copy dist folder from builder stage
COPY --from=builder /ng-app/dist /var/www

CMD ["nginx", "-g", "daemon off;"]