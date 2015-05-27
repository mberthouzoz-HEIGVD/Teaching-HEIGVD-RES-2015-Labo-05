#
# This image is based on another image
#
FROM node

#
# For information: who maintains this Dockerfile?
#
MAINTAINER Michael Berthouzoz

#
# When we create the image, we copy files from the host into
# the image file system. This is NOT a shared folder!
#
ADD ./app /app
COPY ./heartbeat/heartbeat.js /heartbeat.js

COPY start.sh /backend/start.sh
RUN npm install express
RUN npm install -g pm2@0.12.9

EXPOSE 80

CMD ["bash", "/backend/start.sh"]
