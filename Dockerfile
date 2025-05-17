# Build stage
FROM node:23-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
RUN npm i -g serve
COPY . .
RUN npm run build
EXPOSE 80
CMD ["serve", "-s", "dist"]