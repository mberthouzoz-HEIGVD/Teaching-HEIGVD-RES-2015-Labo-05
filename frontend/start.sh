#!/bin/bash
pm2 start /heartbeat.js
apachectl -DFOREGROUND
