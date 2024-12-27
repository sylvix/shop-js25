# Build Stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY postinstall.js ./
RUN npm install
COPY . .
ARG VITE_API_URL
ARG VITE_GOOGLE_CLIENT_ID
RUN npm run build

# Production Stage
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]