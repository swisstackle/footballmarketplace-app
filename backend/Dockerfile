FROM node:latest
WORKDIR /backend
ARG PORT
ARG DBPORT
ARG USER
ARG PASSWORD
ARG DATABASE
ARG HOST
ENV PORT=$PORT
ENV DBPORT=$DBPORT
ENV USERNAME=$USER
ENV PASSWORD=$PASSWORD
ENV DATABASE=$DATABASE
ENV HOST=$HOST
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run tsc
EXPOSE 3000
CMD ["npm", "run", "dev"]