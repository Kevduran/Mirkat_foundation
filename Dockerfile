# Build stage
FROM node:23-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY localhost.crt /etc/ssl
COPY localhost.key /etc/ssl
EXPOSE 443
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]