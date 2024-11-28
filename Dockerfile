FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock files to the working directory
COPY package.json yarn.lock ./

# Install backend dependencies
RUN yarn

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN yarn build

# Expose the port on which the backend server will run and nginx will proxy
EXPOSE 5097

# Start the backend server in production mode
CMD ["yarn", "start:prod"]
