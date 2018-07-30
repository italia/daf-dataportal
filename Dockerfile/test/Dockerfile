# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
FROM node:8

# The base node image sets a very verbose log level.
ENV NPM_CONFIG_LOGLEVEL warn

#RUN apt-get update && apt-get install -y \
#  git-core 

#RUN apt-get install sudo

#RUN  sudo fallocate -l 1G /swapfile
#RUN  sudo chmod 600 /swapfile
#RUN  sudo mkswap /swapfile
#RUN  sudo swapon /swapfile
#RUN  "/swapfile   none    swap    sw    0   0" >> /etc/fstab

# Copy all local files into the image.
#RUN git clone -b newSecurity https://github.com/italia/daf-dataportal

# Copy files from the repo
COPY . . 

WORKDIR /daf-dataportal

RUN npm install

# Build for production.
RUN npm run build --production

# Install `serve` to run the application.
RUN npm install -g serve

# Tell Docker about the port we'll run on.
EXPOSE 5000

# Set the command to start the node server.
CMD serve -s dist -l 5000