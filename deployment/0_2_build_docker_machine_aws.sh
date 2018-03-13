#!/usr/bin/env bash

source deployment/aws_config.txt
source deployment/aws_credentials.txt

echo ""
echo "****************************************"
echo "Building Docker-Machine for AWS EC2 on instance >$INSTANCE_NAME<..."

echo "Maybe you need to update the >$SECURITY_GROUP< for SSH (port 22) from this machine."

docker-machine create --driver amazonec2 --amazonec2-access-key $ACCESS_KEY --amazonec2-secret-key $SECRET_KEY --amazonec2-vpc-id $VPC_ID --amazonec2-region $REGION --amazonec2-instance-type $INSTANCE_TYPE --amazonec2-zone $ZONE --amazonec2-security-group $SECURITY_GROUP $INSTANCE_NAME

echo "Done!"
echo "****************************************"
echo ""