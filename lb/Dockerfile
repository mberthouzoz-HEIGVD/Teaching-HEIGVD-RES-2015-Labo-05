#
# This image is based on another image
#
FROM httpd:2.4

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

COPY ./lb/discover.js /discover.js
COPY ./httpd.conf /usr/local/apache2/conf/httpd.conf
COPY ./balancer.conf /usr/local/apache2/conf/extra/balancer.conf
COPY ./start.sh /lb/start.sh

CMD ["bash", "/lb/start.sh"]
