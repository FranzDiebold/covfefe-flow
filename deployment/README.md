<img src="../design/logo/covfefe-flow-logo.png" alt="covfefe-flow logo" style="max-width:100%;" width="400px" height="70px">

# :house: Architecture & :rocket: Deployment

## :house: Architecture

The architecture and interplay of components and (external) services is illustrated in the following image:

![covfefe-flow architecture](./images/readme/covfefe-flow_architecture.jpg)

## Deployment

### API

For an easier deployment of the API, the *infrastructure as code* (IaC) software tool [Terraform](https://www.terraform.io/) is used.

#### Preparations

1. Install Terraform: [https://learn.hashicorp.com/terraform/getting-started/install.html](https://learn.hashicorp.com/terraform/getting-started/install.html)
2. Define a Google Cloud Platform (GCP) project id, i.e. `covfefe-flow-<random_number>` and enter it in:
    - [`prepare_gcp.sh`](prepare_gcp.sh)
    - [`variables.tf`](variables.tf)
3. Run preparation script:
    1. Run `prepare_gcp.sh`: `bash prepare_gcp.sh`. You may run this in the [Google Cloud Shell editor](https://ssh.cloud.google.com/cloudshell/editor). This will:
        - Create a Google Cloud Platform project.
        - Create Service Account and bind the roles `roles/iam.serviceAccountUser`, `roles/storage.admin`, and `roles/cloudfunctions.developer`.
        - Create new private key for the Service Account and save in the file `account.json`.
        - Enable the Google Cloud Platform APIs `cloudfunctions` and `cloudbuild`.
        - You will be asked to enable billing for the created project when running the script.
    2. Copy the file `account.json` into the `deployment` folder.

#### Deployment

1. Commands need to be run in `deployment` folder: `cd /deployment`
2. Initialize the Terraform working directory: `terraform init`
3. Generate and show the Terraform execution plan: `terraform plan`
4. Build the infrastructure: `terraform apply` and confirm with `yes`. This step will output the endpoint URLs `slack_actions_function_url` and `slack_slash_commands_function_url` that you need to enter in the Slack API console.

To destroy/delete the infrastructure: `terraform destroy` and confirm with `yes`


### Makefile

Use the [`Makefile`](../Makefile) to run common tasks. To see which commands are available run `make help`.
