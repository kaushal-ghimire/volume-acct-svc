# Use an official Node.js runtime as a parent image
FROM node:22-alpine AS base

# Set working directory inside container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start the Node.js app
CMD ["npm", "start"]
