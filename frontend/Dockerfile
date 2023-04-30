FROM node:19-alpine AS build

# Set the environment variables
ENV REACT_APP_API=""

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json package-lock.json ./

# Install dependencies

RUN npm ci

# Copy the rest of the files
COPY . .

# Build the app
RUN npm run build

# Add reverse proxy
FROM nginx:1.21-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf