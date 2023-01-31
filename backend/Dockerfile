FROM node:latest
WORKDIR /backend
ARG PORT
ENV PORT=$PORT
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run tsc
EXPOSE 3000
CMD ["npm", "run", "dev"]