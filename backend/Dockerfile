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
COPY ./app /backend

RUN npm install express
RUN npm install -g pm2@0.12.9

EXPOSE 80

CMD /backend/start.sh