# Use official Node.js 20 image as the base image
FROM node:20 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to a temporary directory
COPY . .

# Install dependencies in a temporary directory
RUN npm i
RUN npm rebuild bcrypt --build-from-source

# Stage 2: Create production image
FROM node:20 AS production

# Set the working directory in the container
WORKDIR /app

# Copy the entire application including node_modules from the builder stage
COPY --from=builder /app .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]

