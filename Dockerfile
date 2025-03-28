FROM node:18-alpine 

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application and build
COPY . .
RUN npm run build

# Copy the build output from the previous stage
COPY . .

# Install serve to serve the React build
RUN npm install -g serve

# Expose port 3000
EXPOSE 5000

# Start the application
CMD ["node", "server.js"]
