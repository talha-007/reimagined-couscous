# Use Node.js 20 image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Ensure latest esbuild is installed properly
RUN npm install esbuild --force

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose the port
EXPOSE 4000

# Start the application
CMD ["npm", "run", "dev"]
