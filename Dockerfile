FROM node:9
RUN mkdir -p /usr/src/tide-to-freeagent
WORKDIR /usr/src/tide-to-freeagent
COPY package.json package-lock.json ./
ENV NODE_ENV production
RUN cd /usr/src/tide-to-freeagent && yarn
COPY . .
RUN cd /usr/src/tide-to-freeagent/client && yarn --production=false && yarn run build
COPY . .
EXPOSE 8081
CMD node server.js
