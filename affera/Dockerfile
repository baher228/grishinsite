# Multi-stage build for React app
# Stage 1: Build the React app
FROM node:18-alpine AS build

# Copy package files first for better caching
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Serve the app with nginx
FROM nginx:stable-alpine

# Copy the build output to nginx html directory
COPY --from=build /build /usr/share/nginx/html

# Copy custom nginx configuration (optional)
COPY --from=build nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
