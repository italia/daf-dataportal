# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
FROM node:7.10.0

# The base node image sets a very verbose log level.
ENV NPM_CONFIG_LOGLEVEL warn

RUN apt-get update && apt-get install -y git-core

# Install apt-transport-https
RUN wget http://http.us.debian.org/debian/pool/main/a/apt/apt-transport-https_1.0.9.8.4_amd64.deb
RUN dpkg -i apt-transport-https_1.0.9.8.4_amd64.deb
# Install yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt update && apt install -y yarn


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
