#!/bin/bash

# Lancement de docker UI
docker run -d -p 9000:9000 --privileged -v /var/run/docker.sock:/var/run/docker.sock dockerui/dockerui

# Build des images
docker build -t backend /vagrant/backend
docker build -t frontend /vagrant/frontend
docker build -t lb /vagrant/lb

# Lancement du load balancer
docker run -d -p 80:80 lb

# Lancement des frontends
docker run -d frontend
docker run -d frontend
docker run -d frontend

# Lancement des backends
docker run -d backend
docker run -d backend
docker run -d backend
docker run -d backend

