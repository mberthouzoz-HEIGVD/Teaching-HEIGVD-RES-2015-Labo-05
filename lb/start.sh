#!bin/bash
pm2 start /discover.js
apachectl -DFOREGROUND

