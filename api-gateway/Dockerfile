FROM node:16

RUN mkdir /app
WORKDIR /app

ADD package.json /app/package.json
RUN npm install

COPY . /app

CMD npm start

EXPOSE 10000