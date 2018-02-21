FROM node:9
RUN mkdir -p /usr/src/tide-to-freeagent
WORKDIR /usr/src/tide-to-freeagent
COPY package.json package-lock.json ./
ENV NODE_ENV production
ARG GOOGLE_ANALYTICS_KEY
ENV GOOGLE_ANALYTICS_KEY $GOOGLE_ANALYTICS_KEY
RUN cd /usr/src/tide-to-freeagent && npm install
COPY . .
RUN cd /usr/src/tide-to-freeagent/client && npm install --production=false && npm run build
COPY . .
EXPOSE 8081
CMD node server.js
