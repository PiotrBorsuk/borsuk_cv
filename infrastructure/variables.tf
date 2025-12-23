variable "project_id" {
  description = "ID projektu w Google Cloud"
  type        = string
}

variable "region" {
  description = "Domyślny region dla zasobów"
  type        = string
  default     = "europe-central2" 
}