FROM node:21.7.0

ARG NODE_ENV
ARG PORT

ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/app

ENV TZ=America/Manaus
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY package.json yarn.lock ./

RUN yarn cache clean --mirror

RUN yarn global add @nestjs/cli

COPY . ./

RUN yarn --prod --silent
RUN yarn build

EXPOSE ${PORT}

CMD ["yarn", "start"]
