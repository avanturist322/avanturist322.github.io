---
name: create-project-page
description: >-
  Use when creating a new standalone project page for this site. Creates the
  page under project-websites/<slug>/ with local assets and publishes it at
  https://avanturist322.github.io/<slug>/.
---

# Create Project Page

## Description

Use this skill when the user wants to add a new project website page like:
- `https://avanturist322.github.io/mikasa-robo/`
- `https://avanturist322.github.io/KAGEBench/`

Project pages in this repo are organized as:
- source page: `project-websites/<slug>/index.html`
- local assets: `project-websites/<slug>/static/*` and optionally `project-websites/<slug>/assets/*`
- public route: `/<slug>/` (set via front matter in `index.html`)

## Instructions

1. Go to repository root.
2. Create a new project page from template with `bin/new-project-website.sh <slug>`.
3. Fill project content in `project-websites/<slug>/index.html`.
4. Put all project-specific media into:
   - `project-websites/<slug>/static/images|videos|pdfs|css|js`
   - `project-websites/<slug>/assets` (optional extra media)
5. Ensure SEO tags in the page are updated:
   - `canonical`
   - `og:url`
   - `twitter:image` / `og:image`
   - `meta name="robots" content="index, follow"`
6. Add the new page URL to `sitemap-papers.xml`.
7. (Optional) add links to the page from homepage/news sections.

## Templates

```bash
# 0) Go to repo root
cd /path/to/avanturist322

# 1) Create project page from template
bin/new-project-website.sh website_1

# 2) Check front matter + route
sed -n '1,12p' project-websites/website_1/index.html

# 3) Verify that local assets are namespaced
rg -n '/project-websites/website_1/' project-websites/website_1/index.html
```

## Examples

Create a new page and copy media:
```bash
bin/new-project-website.sh website_2
mkdir -p project-websites/website_2/assets/images
cp /path/to/fig1.png project-websites/website_2/assets/images/
```

Add page to sitemap:
```bash
# edit sitemap-papers.xml and add:
# <loc>{{ site.url }}/website_2/</loc>
```

## Notes

- `bin/new-project-website.sh` currently validates slug as:
  - `[a-z0-9][a-z0-9_-]*`
- `template` slug is reserved.
- `_site/` is build output only; never edit it manually.
- Source of truth is always `project-websites/<slug>/...`.

## Configuration

Current workflow files:
- generator: `bin/new-project-website.sh`
- template source: `project-websites/template/index.html`
- workflow docs: `project-websites/README.md`
- indexing: `robots.txt`, `sitemap-papers.xml`

## Validation

```bash
slug=website_1
test -f "project-websites/${slug}/index.html"
test -d "project-websites/${slug}/static"
rg -n "permalink: /${slug}/" "project-websites/${slug}/index.html"
rg -n 'index, follow' "project-websites/${slug}/index.html"
echo "OK: ${slug}"
```
