# Use the official Node.js 16 image.
# https://hub.docker.com/_/node
FROM node:20

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install production dependencies.
RUN npm install --only=production

# Install SQLite3
RUN npm install sqlite3

# Copy local code to the container image.
COPY . .

# Build the application.
RUN npm run build

# Install pm2 to run the application.
RUN npm install -g pm2

# Set up the RabbitMQ environment variables.
ENV RABBITMQ_URL=amqp://guest:guest@rabbitmq:5672
ENV RABBITMQ_QUEUE=myqueue
ENV RABBITMQ_PREFETCH_COUNT=1

# Set up the Socket.io environment variables.
ENV SOCKET_PORT=3000
ENV SOCKET_PATH=/socket.io

# Expose the port the app runs on.
EXPOSE 3000

# Use an anonymous volume to store SQLite database file.
VOLUME ["/data"]

# Set the SQLite database file environment variable.
ENV SQLITE_DB_FILE=/data/mydatabase.db

# Run the application.
CMD ["pm2-runtime", "start", "dist/apps/postal/main.js"]