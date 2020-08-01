#!/bin/bash

project_id="covfefe-flow-<random_number>"
project_name="covfefe-flow"
service_account_id="$project_id-sa"

service_account_email="$service_account_id@$project_id.iam.gserviceaccount.com"

# Google Cloud Platform project
gcloud projects create "$project_id" --name="$project_name"

# Google IAM Service account
gcloud iam service-accounts create "$service_account_id" --display-name="$service_account_id" --project="$project_id"
roles=(
    "roles/iam.serviceAccountUser"
    "roles/storage.admin"
    "roles/cloudfunctions.developer"
)
for role in "${roles[@]}"; do
    gcloud projects add-iam-policy-binding "$project_id" --member="serviceAccount:$service_account_email" --role="$role"
done
gcloud iam service-accounts keys create --iam-account="$service_account_email" account.json

echo "##########################################################"
echo "You need to enable billing for the newly created project."
echo "You can do this here: https://console.cloud.google.com/billing/linkedaccount?project=$project_id"
read -p "When you are done with that press [enter] to continue..."

# Enable Google Cloud Platform APIs
apis=(
    "cloudfunctions"
    "cloudbuild"
)
for api in "${apis[@]}"; do
    gcloud services enable "$api.googleapis.com" --project="$project_id"
done
