# Global configurations
provider "google" {
  credentials = file("account.json")
  project = var.project_name
  region  = var.region
}

# Google Storage Bucket
resource "google_storage_bucket" "cloud_functions_code_bucket" {
  name     = "cloud-functions-code-bucket-${var.project_name}"
  location = var.region
}
data "archive_file" "api_archive" {
  type        = "zip"
  source_dir  = "../api/src/"
  output_path = "api.zip"
}
resource "google_storage_bucket_object" "api_zip" {
  name   = data.archive_file.api_archive.output_path
  source = data.archive_file.api_archive.output_path
  bucket = google_storage_bucket.cloud_functions_code_bucket.name
}

resource "google_storage_bucket" "model_bucket" {
  name     = "model-bucket-${var.project_name}"
  location = var.region
}

# Google Cloud Functions
resource "google_cloudfunctions_function" "api_function" {
  name                  = "api"
  description           = "API"
  runtime               = "python37"

  available_memory_mb   = 2048
  timeout               = 60
  trigger_http          = true
  entry_point           = "handle"

  source_archive_bucket = google_storage_bucket.cloud_functions_code_bucket.name
  source_archive_object = google_storage_bucket_object.api_zip.name

  environment_variables = {
    MODEL_BUCKET_NAME   = google_storage_bucket.model_bucket.name
  }
}
