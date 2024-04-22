# Use node image as base
FROM node:20.11.1-bullseye-slim

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variables
ENV NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyDa6gjdKPRcXC1tz6yNEMOcgl73S9IbO98" \
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="devkode-dk.firebaseapp.com" \
    NEXT_PUBLIC_FIREBASE_PROJECT_ID="devkode-dk" \
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="devkode-dk.appspot.com" \
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="1011657468017" \
    NEXT_PUBLIC_FIREBASE_APP_ID="1:1011657468017:web:c01e7fa228683fd0f293d0"

# Expose port (if needed)
# EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "dev"]