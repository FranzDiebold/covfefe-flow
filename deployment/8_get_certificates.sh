#!/usr/bin/env bash

echo ""
echo "****************************************"
echo "Getting Let's Encrypt certificates..."

docker-compose up letsencrypt-certbot

echo "Removing unneeded container..."

docker-compose rm -f letsencrypt-certbot

echo "Done!"
echo "****************************************"
echo ""