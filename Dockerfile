FROM node:14.9.0-alpine3.10

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app
COPY yarn.lock /app

RUN npm install --silent
RUN npm install react-scripts@3.4.3 -g --silent

COPY . /app

EXPOSE 3000

CMD ["npm", "start"]