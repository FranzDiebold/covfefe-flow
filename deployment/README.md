<img src="../design/logo/covfefe-flow-logo.png" alt="covfefe-flow logo" style="max-width:100%;" width="400px" height="70px">

# :house: Architecture & :rocket: Deployment

## :house: Architecture

The architecture and interplay of components and (external) services is illustrated in the following image:

![covfefe-flow architecture](./images/readme/covfefe-flow_architecture.jpg)

### Internal

#### :whale: [Docker](https://www.docker.com)

The individual components of the covfefe-flow application are containerized using [Docker](https://github.com/docker/docker-ce).
These containers are represented by the blue boxes in the above architecture illustration.
The following Docker features are used:
- [Docker volumes](https://docs.docker.com/engine/admin/volumes/volumes/) for persisting and sharing data between Docker containers. The Docker volumes are represented by the blue cylinders in the above architecture illustration.
- Docker [multi-stage builds](https://docs.docker.com/engine/userguide/eng-image/multistage-build/) for building and serving the Angular client app (see [webapp Dockerfile](../webapp/Dockerfile))
- [Docker Compose](https://github.com/docker/compose) for orchestrating the containers (see [docker-compose.yml](../docker-compose.yml))
- [Docker Machine](https://github.com/docker/machine) for provisioning to a remote Docker host on [AWS EC2](https://aws.amazon.com/de/ec2/)


#### [AWS EC2](https://aws.amazon.com/ec2)
The complete covfefe-flow app is running on an [AWS EC2](https://aws.amazon.com/ec2) `t2.micro` instance (see [AWS config file](./aws_config.txt)).
For provisioning the app to AWS EC2 the [`amazonec2` Docker Machine driver](https://docs.docker.com/machine/examples/aws/) is used (see [0_2_build_docker_machine_aws.sh](./0_2_build_docker_machine_aws.sh)).


##### Security Group `covfefe-flow-sec-group`
In the [AWS console](https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#SecurityGroups) you need create a new Security Group with the name `covfefe-flow-sec-group` and the following rules:

**Inbound rules:**

<img src="./images/readme/covfefe-flow-aws-security-group-create-inbound.jpg" width="600px" height="289px" style="max-width:100%;" alt="AWS security group inbound rules">

- `HTTP` (port 80) and `HTTPS` (port 443) from anywhere
- `SSH` (port 22) from your IP
- `Docker machine` (port 2376) from your IP

**Outbound rules:**

<img src="./images/readme/covfefe-flow-aws-security-group-outbound.jpg" width="600px" height="125px" style="max-width:100%;" alt="AWS security group outbound rules">

- `HTTP` (port 80) and `HTTPS` (port 443) to anywhere


### External

#### [Let’s Encrypt](https://letsencrypt.org)
The SSL certificate used for covfefe-flow is issued by [Let’s Encrypt](https://letsencrypt.org) and thus free! It was generated using the official [certbot/certbot](https://hub.docker.com/r/certbot/certbot/) Docker image.



#### [Cloudflare](https://www.cloudflare.com)
In order to speed up performance the reverse proxy and content delivery network (CDN) services by Cloudflare are used. However, it is only used for the static content via the `www` subdomain.
The API traffic via the `api` subdomain is directly routed to the AWS EC2 instance.
The following DNS settings should be used.

<img src="./images/readme/cloudflare_dns_settings.jpg" width="600px" height="170px" style="max-width:100%;" alt="Cloudflare DNS settings">

The IP of the AWS EC2 instance can be obtained from the [AWS console](https://console.aws.amazon.com/ec2/v2/home).

Moreover, the nameservers at the domain registrar need to be changed to ones from Cloudflare.


## :rocket: Deployment
The deployment process is simplified and automated by using several shell scripts. These scripts must be run from the root folder.

### :clapper: Preparations

The following preparations must be completed before deploying the application:
- In [`deployment/aws_credentials.txt`](./aws_credentials.txt) enter your AWS `ACCESS_KEY`, `SECRET_KEY` and `VPC_ID` ([Managing Access Keys for IAM Users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html)).


#### Build and set Docker Machines
The local Docker Machine is for getting the tweets and training. The AWS Docker Machine is for hosting the app.
```bash
sh deployment/0_1_build_docker_machine_local.sh
sh deployment/0_2_build_docker_machine_aws.sh
eval $(docker-machine env covfefe-flow)
sh deployment/1_2_set_docker_machine_aws.sh
```


#### Get certificates
```bash
sh deployment/8_get_certificates.sh
```


#### Build services
```bash
sh deployment/<SERVICE_NUMBER>_start_<SERVICE_NAME>.sh
```


#### :mag: Inspect containers
```bash
docker-compose run --rm <CONTAINER_NAME> bash
```


#### Checking logs
```bash
docker-compose logs
docker-compose logs <CONTAINER_NAME>
```



## :ballot_box_with_check:️ TODOs
- [ ] Use [Docker Cloud](https://cloud.docker.com) on AWS