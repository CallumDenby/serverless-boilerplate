FROM mhart/alpine-node:6.10

WORKDIR /app
ADD . .

RUN npm i -g yarn
RUN yarn
RUN yarn lint
RUN yarn test
CMD yarn start
