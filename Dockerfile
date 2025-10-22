# Multi-stage Dockerfile for Nuxt.js static site# Multi-stage Dockerfile for Nuxt.js static site

# Stage 1: Build the application# Stage 1: Build the application

FROM node:22-alpine AS builderFROM node:22-alpine AS builder



# Set working directory# Set working directory

WORKDIR /appWORKDIR /app



# Copy package files# Copy package files

COPY package*.json ./COPY package*.json ./



# Install dependencies# Install dependencies

RUN npm ciRUN npm ci



# Copy source code# Copy source code

COPY . .COPY . .



# Build the application (generates static files)# Build the application (generates static files)

RUN npm run generateRUN npm run generate



# Stage 2: Serve with nginx# Stage 2: Serve with nginx

FROM nginx:alpineFROM nginx:alpine



# Copy built application from builder stage# Copy built application from builder stage

COPY --from=builder /app/.output/public /usr/share/nginx/htmlCOPY --from=builder /app/.output/public /usr/share/nginx/html



# Copy custom nginx configuration for SPA support# Copy custom nginx configuration for SPA support

COPY nginx.conf /etc/nginx/conf.d/default.confCOPY nginx.conf /etc/nginx/conf.d/default.conf



# Expose port 80# Expose port 80

EXPOSE 80EXPOSE 80



# Health check# Start nginx

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \CMD ["nginx", "-g", "daemon off;"]

  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
