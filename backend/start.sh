#!bin/bash
pm2 start /app/app.js
pm2 start /heartbeat.js
pm2 monit
