#
# This image is based on another image
#
FROM tutum/apache-php

#
# For information: who maintains this Dockerfile?
#
MAINTAINER Michael Berthouzoz

#
# When we create the image, we copy files from the host into
# the image file system. This is NOT a shared folder!
#

COPY www /app/

COPY ./start.sh /frontend/start.sh

EXPOSE 80

CMD /frontend/start.s