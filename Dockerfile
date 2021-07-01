FROM alpine:latest

RUN apk update && apk add --no-cache nodejs npm

WORKDIR /opt
ADD ./app/package.json /opt
RUN npm install
ADD ./app /opt

CMD ["npm", "start"]
