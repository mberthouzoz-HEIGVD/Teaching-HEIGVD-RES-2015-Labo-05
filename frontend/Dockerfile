#
# This image is based on another image
#
FROM tutum/apache-php

#
# For information: who maintains this Dockerfile?
#
MAINTAINER Michael Berthouzoz

RUN apt-get update
RUN apt-get --purge remove node  -y
RUN apt-get install nodejs -y
RUN ln -s /usr/bin/nodejs /usr/bin/node
RUN apt-get update --fix-missing
RUN apt-get install npm -y
RUN npm install -g pm2@0.12.9

#
# When we create the image, we copy files from the host into
# the image file system. This is NOT a shared folder!
#

ADD ./app /app

COPY ./start.sh /frontend/start.sh
COPY ./heartbeat.js /heartbeat.js

EXPOSE 80

CMD ["bash", "/frontend/start.sh"]
