FROM node:12-alpine
WORKDIR /frontend
COPY . .
RUN apk add nano
RUN npm install
CMD ["npm", "start"]
