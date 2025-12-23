# --- 0. Enabling APIs ---
locals {
  services = [
    "cloudbuild.googleapis.com",
    "run.googleapis.com",
    "artifactregistry.googleapis.com"
  ]
}

resource "google_project_service" "enabled_apis" {
  for_each = toset(local.services)

  project            = var.project_id
  service            = each.value
  disable_on_destroy = false
}

# --- 1. Service Account: cr-builder-sa ---
resource "google_service_account" "builder_sa" {
  account_id   = "cr-builder-sa"
  display_name = "Cloud Run Builder Service Account"
  description  = "SA used for building and deploying via Cloud Build"
  depends_on = [google_project_service.enabled_apis]
}

locals {
  builder_roles = [
    "roles/cloudbuild.builds.builder", 
    "roles/run.admin",               
    "roles/iam.serviceAccountUser"     
  ]
}

resource "google_project_iam_member" "builder_sa_roles" {
  for_each = toset(local.builder_roles)

  project = var.project_id
  role    = each.value
  member  = "serviceAccount:${google_service_account.builder_sa.email}"
}

# --- 2. Service Account: cv-app-sa ---
resource "google_service_account" "app_sa" {
  account_id   = "cv-app-sa"
  display_name = "CV App Service Account"
  description  = "Identity for the CV Application running on Cloud Run"
}

resource "google_project_iam_member" "app_sa_invoker" {
  project = var.project_id
  role    = "roles/run.invoker"
  member  = "serviceAccount:${google_service_account.app_sa.email}"
}

resource "google_artifact_registry_repository" "builds_repo" {
  location      = var.region 
  repository_id = "builds"
  description   = "Docker repository for application builds"
  format        = "DOCKER"
  project       = var.project_id

  depends_on = [google_project_service.enabled_apis]
}