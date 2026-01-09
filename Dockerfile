# 1. Build stage
FROM node:24-alpine AS build
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN DISABLE_ESLINT_PLUGIN=true npm run build

FROM nginx:alpine
COPY --from=build /out /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
