# 1. Build stage
FROM node:24-alpine AS build
WORKDIR /app
COPY . .
RUN DISABLE_ESLINT_PLUGIN=true npm install --legacy-peer-deps
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/out /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
