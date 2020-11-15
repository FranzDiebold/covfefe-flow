variable "project_name" {
  default   = "covfefe-flow-<random_number>"

  validation {
    condition     = can(regex("^covfefe-flow-", var.project_name))
    error_message = "The \"project_name\" value must start with \"covfefe-flow-\"."
  }
}

variable "region" {
  default   = "europe-west1"  # St. Ghislain, Belgium
}

variable "location_id" {
  default   = "europe-west"   # Belgium
}
