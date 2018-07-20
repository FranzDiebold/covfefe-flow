#!/usr/bin/env bash

source deployment/aws_config.txt

echo ""
echo "****************************************"
echo "Setting the Docker-Machine >$INSTANCE_NAME< as default..."

eval "$(docker-machine env $INSTANCE_NAME)"

echo "Done!"
echo "****************************************"
echo ""