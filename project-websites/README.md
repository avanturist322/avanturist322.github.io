# Project websites

This directory stores standalone project websites based on `Academic-project-page-template`.

## Current setup

- `project-websites/template/` — base template
- `project-websites/mikasa-robo/` — current project website
- `project-websites/KAGEBench/` — current project website

## Create a new page

From repo root:

```bash
bin/new-project-website.sh website_1
```

This creates `project-websites/website_1/` and publishes page URL `/website_1/` while keeping assets in `project-websites/website_1/`.

- `<title>`
- main page heading
- canonical project URL placeholders
- Jekyll front matter with `permalink: /website_1/`

Then edit `project-websites/website_1/index.html` with your real content.

## Routing model

- Project page URL: `https://avanturist322.github.io/<slug>/`
- Project assets URL base: `https://avanturist322.github.io/project-websites/<slug>/...`

## Assets hierarchy

Each project website is self-contained:

- `project-websites/<slug>/index.html`
- `project-websites/<slug>/static/css/*`
- `project-websites/<slug>/static/js/*`
- `project-websites/<slug>/static/images/*`
- `project-websites/<slug>/static/videos/*`
- `project-websites/<slug>/static/pdfs/*`
- `project-websites/<slug>/assets/*` (optional extra assets)

So content/assets for one project never mix with another.
