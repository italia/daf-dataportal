# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
FROM node:8

# The base node image sets a very verbose log level.
ENV NPM_CONFIG_LOGLEVEL warn

WORKDIR /daf-dataportal

# Copy files from the repo
COPY . . 

RUN npm install

# Build for production.
RUN npm run build --production

# Install `serve` to run the application.
RUN npm install -g serve

# Tell Docker about the port we'll run on.
EXPOSE 5000

# Set the command to start the node server.
CMD serve -s dist -l 5000
