#!/bin/bash
pm2 start /discover.js
touch /lb/backend.conf
touch /lb/frontend.conf
apachectl -DFOREGROUND

