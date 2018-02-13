# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
FROM node:7.10.0

# The base node image sets a very verbose log level.
ENV NPM_CONFIG_LOGLEVEL warn

RUN apt-get update && apt-get install -y git-core

# install yarn
RUN curl -o- -L https://yarnpkg.com/install.sh | bash

# Copy all local files into the image.
RUN git clone https://github.com/italia/daf-dataportal

WORKDIR /daf-dataportal

# install packages
RUN yarn

# Build for production.
RUN npm run build --production

# Install `serve` to run the application.
RUN npm install -g serve

# Set the command to start the node server.
CMD serve  -s build

# Tell Docker about the port we'll run on.
EXPOSE 5000
