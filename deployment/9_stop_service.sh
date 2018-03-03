#!/usr/bin/env bash

echo ""
echo "****************************************"
echo "Stopping service >"$1"<..."

docker-compose stop $1
docker-compose rm -f $1
docker rmi "src_"$1

echo "Done!"
echo "****************************************"
echo ""