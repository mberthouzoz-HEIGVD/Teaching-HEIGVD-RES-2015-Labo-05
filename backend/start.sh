#!bin/bash
pm2 start /app/app.js
pm2 start /heartbeat/hearthbeat.js
pm2 monit