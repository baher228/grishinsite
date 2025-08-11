# Use Node.js LTS Alpine image for smaller size
FROM node:18-alpine


# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Install TypeScript globally for building
RUN npm install -g typescript

# Copy TypeScript configuration
COPY tsconfig.json ./

# Copy source code
COPY . .

# Build TypeScript to JavaScript
RUN npm run build

# Expose the port the app runs on
EXPOSE 4200

# Start the application
CMD ["node", "dist/server.js"]
