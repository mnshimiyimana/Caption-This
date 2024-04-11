FROM node:18-alpine as dependencies
WORKDIR /my-project
COPY . .
RUN yarn
RUN yarn build

EXPOSE 3000
CMD ["yarn", "start"]
