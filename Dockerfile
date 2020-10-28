# Build production stage 
FROM node:lts-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV VUE_APP_URL='http://'
ENV VUE_APP_STATIC_URL='http://'
RUN npm run build

# Production stage 
FROM nginx:latest as productions-stage
COPY nginx/nginx.conf /etc/nginx/conf.d/
COPY --from=build /app/dist /dist/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
