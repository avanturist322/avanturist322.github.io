#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: bin/new-project-website.sh <website-slug>" >&2
  echo "Example: bin/new-project-website.sh website_1" >&2
  exit 1
fi

slug="$1"
if [[ ! "$slug" =~ ^[a-z0-9][a-z0-9_-]*$ ]]; then
  echo "Error: slug must match [a-z0-9][a-z0-9_-]*" >&2
  exit 1
fi

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
repo_root="$(cd "${script_dir}/.." && pwd)"
template_dir="${repo_root}/project-websites/template"
websites_root="${repo_root}/project-websites"
target_dir="${websites_root}/${slug}"

if [[ "${slug}" == "template" ]]; then
  echo "Error: 'template' is reserved for the base template directory." >&2
  exit 1
fi

if [[ ! -d "${template_dir}" ]]; then
  echo "Error: template directory not found: ${template_dir}" >&2
  exit 1
fi

if [[ -e "${target_dir}" ]]; then
  echo "Error: target already exists: ${target_dir}" >&2
  exit 1
fi

cp -R "${template_dir}" "${target_dir}"

tmp_file="$(mktemp)"
{
  printf '%s\n' '---' 'layout: none' "permalink: /${slug}/" '---'
  cat "${target_dir}/index.html"
} > "${tmp_file}"
mv "${tmp_file}" "${target_dir}/index.html"

project_url="https://avanturist322.github.io/${slug}/"
perl -0pi -e "s#<title>PAPER_TITLE - AUTHOR_NAMES \\| Academic Research</title>#<title>${slug} | Academic Research</title>#g" "${target_dir}/index.html"
perl -0pi -e "s#<h1 class=\"title is-1 publication-title\">Academic Project Page</h1>#<h1 class=\"title is-1 publication-title\">${slug}</h1>#g" "${target_dir}/index.html"
perl -0pi -e "s#https://YOUR_DOMAIN.com/YOUR_PROJECT_PAGE#${project_url}#g" "${target_dir}/index.html"
perl -0pi -e "s#https://your-domain.com/your-project-page#${project_url}#g" "${target_dir}/index.html"
perl -0pi -e "s#(href|src)=\\\"static/#\$1=\\\"/project-websites/${slug}/static/#g" "${target_dir}/index.html"
perl -0pi -e "s#(href|src)=\\\"assets/#\$1=\\\"/project-websites/${slug}/assets/#g" "${target_dir}/index.html"

echo "Created project website: project-websites/${slug}/"
echo "Edit project-websites/${slug}/index.html; assets stay in project-websites/${slug}/static and project-websites/${slug}/assets"
echo "Page URL: ${project_url}"
