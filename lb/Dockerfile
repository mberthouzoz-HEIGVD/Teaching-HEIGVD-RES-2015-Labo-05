#
# This image is based on another image
#
FROM httpd:2.4

#
# For information: who maintains this Dockerfile?
#
MAINTAINER Michael Berthouzoz

COPY ./httpd.conf /usr/local/apache2/conf/httpd.conf
COPY ./balancer.conf /usr/local/apache2/conf/extra/balancer.conf